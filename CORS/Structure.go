package CORS

import (
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

//наша структура автомобилей
type Auto struct {
	ID    uint   `json:"id" gorm:"primary_key"`
	Marka string `json:"marka"`
	Model string `json:"model"`
}

//подключение к базе данных
func ConnectDB() *gorm.DB {
	dsn := "host=localhost user=postgres password=ajk354rmlet dbname=ONIT port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Не удалось подключиться к базе данных")
	}
	//Миграция нашей структуры в бд
	db.AutoMigrate(&Auto{})
	return db
}
