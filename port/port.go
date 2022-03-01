package port

import (
	"fmt"
	"net"
	"strconv"
	"time"
)

type ScanResult struct {
	Port     string
	Protocol string
	State    string
	Service  string
}

var results []ScanResult

func ScanPort(protocol, hostname string, port int, ch chan bool) ScanResult {

	result := ScanResult{Port: strconv.Itoa(port)}
	result.Protocol = protocol
	address := hostname + ":" + strconv.Itoa(port)
	_, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		result.State = "Closed"
		//return result
		results = append(results, result)
		fmt.Println(result)
		ch <- true
		return result
	}
	//defer conn.Close()

	result.State = "Open"
	results = append(results, result)
	fmt.Println(result)
	ch <- true
	return result
}

// func InitialScan(hostname string) []ScanResult {

// 	var results []ScanResult

// 	for i := 0; i <= 1024; i++ {
// 		results = append(results, ScanPort("udp", hostname, i))
// 	}

// 	for i := 0; i <= 1024; i++ {
// 		results = append(results, ScanPort("tcp", hostname, i))
// 	}

// 	return results
// }

func WideScan(hostname string) []ScanResult {
	if len(results) != 0 {
		return results
	}
	//	var results []ScanResult
	ch := make(chan bool)
	for i := 0; i <= 60000; i++ {
		//results = append(results, ScanPort("udp", hostname, i))
		go ScanPort("udp", hostname, i, ch)
		go ScanPort("tcp", hostname, i, ch)

	}

	for j := 0; j <= 120000; j++ {
		<-ch
	}

	return results
}
