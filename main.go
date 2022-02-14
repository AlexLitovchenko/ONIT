package main

import (
	"kursach/Shifr"
	"kursach/port"

	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	v1 := r.Group("/v1")
	{
		v1.POST("/aes", Shifr.Aes1)
		v1.POST("/desc", Shifr.Desc1)
		v1.GET("/ports", port.Quest2)
	}

	//fmt.Println("Server is listening...")
	r.Run(":8080")
}
