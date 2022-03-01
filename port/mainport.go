package port

import (
	// "fmt"

	"net/http"

	"github.com/gin-gonic/gin"
)

func Quest2(con *gin.Context) {
	// fmt.Println("Port Scanning")
	//results := InitialScan("localhost")
	// fmt.Println(results)

	widescanresults := WideScan("localhost")
	//fmt.Println(len(widescanresults))

	//All_Ports := append(results, widescanresults...)
	//sort.Slice(widescanresults, func(i, j int) bool { return widescanresults[i].Port < widescanresults[j].Port })
	con.JSON(http.StatusOK, widescanresults)
}
