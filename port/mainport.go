package port

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Quest2(con *gin.Context) {
	fmt.Println("Port Scanning")
	results := InitialScan("localhost")
	//ßfmt.Println(results)

	widescanresults := WideScan("localhost")
	//fmt.Println(widescanresults)

	All_Ports := append(results, widescanresults...)
	con.JSON(http.StatusOK, All_Ports)
}
