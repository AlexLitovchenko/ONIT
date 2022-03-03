package port

import (
	"fmt"
	"net"
	"strconv"
	"sync"
	"time"
)

type ScanResult struct {
	Port     string `json:"port"`
	Protocol string `json:"protocol"`
	State    string `json:"state"`
	Service  string
}

var results []ScanResult

var wg sync.WaitGroup
var count int

func ScanPort(protocol, hostname string, port int) {
	defer wg.Done()
	result := ScanResult{Port: strconv.Itoa(port)}
	result.Protocol = protocol
	address := hostname + ":" + strconv.Itoa(port)
	_, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		result.State = "Closed"
		results = append(results, result)
		fmt.Println(result)
		count++

	} else {
		result.State = "Open"
		results = append(results, result)
		fmt.Println(result)
		count++
	}

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

	// if len(results) != 0 {
	// 	return results
	// }
	//	var results []ScanResult
	//ch := make(chan bool)
	wg.Add(120002)
	//results = append(results, ScanPort("udp", hostname, i))
	for i := 0; i <= 60000; i++ {
		go ScanPort("udp", hostname, i)
		go ScanPort("tcp", hostname, i)
	}
	//<-ch
	wg.Wait()
	fmt.Print(count)
	return results
}
