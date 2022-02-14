package port

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Quest2(con *gin.Context) {
	fmt.Println("Port Scanning")
	results := InitialScan("localhost")
	fmt.Println(results)

	widescanresults := WideScan("localhost")
	fmt.Println(widescanresults)

	con.JSON(http.StatusOK, gin.H{
		"status": "posted",
	})
}
