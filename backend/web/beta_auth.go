package web

import (
	"github.com/cthit/KeepIT/backend"
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gocraft/web"
	"io/ioutil"
	"net/http"
	"time"
)

type meResult struct {
	Cid    string   `json:"uid"`
	Groups []string `json:"groups"`
}

type keepITClaims struct {
	User KeepIT.Person `json:"user"`
	jwt.StandardClaims
}

type authResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int64  `json:"expires_in"`
}

func getHttpClient() *http.Client {
	return &http.Client{} //TODO set timeout
}

func getProviderToken(code string) (string, error) {

	request, _ := http.NewRequest(http.MethodPost, "https://beta-account.chalmers.it/oauth/token", nil)

	q := request.URL.Query()
	q.Add("client_id", "6be7c3f6f73eeb461e5c5dc0964fd9d39ec5c8272d57835494c956ace7530f46")
	q.Add("grant_type", "authorization_code")
	q.Add("code", code)
	q.Add("client_secret", "3d81df8dbed0178c0e07e03529252ede6f8834f069f7f2262a698e6c15f19ea4")
	q.Add("redirect_uri", "http://localhost:8080/oauth/callback") // Needed but does not do anything
	request.URL.RawQuery = q.Encode()

	response, err := getHttpClient().Do(request)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	fmt.Println(string(body))

	var result struct {
		AccessToken string `json:"access_token"`
	}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return "", err
	}

	return result.AccessToken, nil
}

func (c *Context) Auth(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	c.User = KeepIT.Person{
		Cid: "svenel", // FIXME
	}

	// TODO: Verify && Parse jwt token (as bearer)

	next(rw, req)
}

func (c *Context) Login(rw web.ResponseWriter, req *web.Request) {
	code := req.URL.Query().Get("code")

	providerToken, err := getProviderToken(code)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	meReq, _ := http.NewRequest(http.MethodGet, "https://beta-account.chalmers.it/me.json", nil)
	meReq.Header.Set("Authorization", "Bearer "+providerToken)
	response, err := (&http.Client{}).Do(meReq)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	var meResult meResult
	err = json.Unmarshal(body, &meResult)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	mySigningKey := []byte("MY JWT SECRET") // TODO

	mePerson, err := c.PersonService.Person(meResult.Cid)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Create the Claims
	claims := keepITClaims{
		User: mePerson,
		StandardClaims: jwt.StandardClaims{
			Audience:  "digit.KeepIT",
			ExpiresAt: time.Now().Add(time.Hour).Unix(),
			Id:        "", // TODO token ids
			IssuedAt:  time.Now().Unix(),
			Issuer:    "digit.KeepIT",
			NotBefore: time.Now().Unix(),
			Subject:   meResult.Cid,
		},
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := jwtToken.SignedString(mySigningKey)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	authResult := authResponse{
		AccessToken: signedToken,
		TokenType:   "Bearer",
		ExpiresIn:   time.Hour.Nanoseconds(),
	}

	// Marshal data
	data, err := json.Marshal(authResult)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)
	rw.Write(data)

}

func (c *Context) PopulateUser(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	charirmanGroups, err := c.PersonService.GroupsWithChairman(c.User)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	c.User.ChairmanIn = charirmanGroups

	groups, err := c.PersonService.Groups(c.User)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	c.User.Groups = groups

	for _, group := range c.User.Groups {
		if group == "styrit" || group == "dpo" {
			c.ResponsibleForAll = true
			break
		}
	}

	next(rw, req)
}
