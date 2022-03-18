# Assignment 3 - IoT Project


### Describe the thing

My Thing(DHT-22 + Raspberry Pi 3b) sends temperature and humidity data through the Broker io.adafruit.com about every ten seconds.
Adafruit then gets the requests for new measurements every ten seconds because of a data limit that can be sent through at a time on Adafruit.

As mentioned above I am using the Broker Adafruit, this means that I am sending data via the Cloud Integration pattern mentioned in the book.
The protocol used to send the data is MQTT.

A REST-API was made and HATEOAS has been considered. There are links leading to the properties temperature and humidity, these in turn however do not provide a link to get back to the Root. Access to the model has been given as well through the Root of the Api.

Some things were excluded, such as Actions since they were not created and thus having a resource for it would be a blank page and unnessecary.

JSON is the standard format and when a user requests it without the Accept: application/json in the header, they will regardless receive JSON format of the resources. The check is however made to ensure if it there.
Verified with http://plugfest.thingweb.io/playground/.

#### Functionality

- [Public URL to the Client-App](https://obscure-retreat-95512.herokuapp.com/weather)
- [Public URL to the API](https://api-indoor-weather.herokuapp.com/api/v1)

--- 

- [URL to the recording on Youtube](https://www.youtube.com/watch?v=AYLM5O2kekE)

---

- [Public URL to the Raspberry Pi 3b](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
- [URL to the DHT-22 Sensor being used](https://www.digikey.com/catalog/en/partgroup/dht22-temperature-and-humidity-sensor/58084)


### Individual reflection

- Your thoughts on the assignment. What was hard?
  - While documentation was good initially on using/setting up the hardware, I noticed that installing Raspbian and setting up a node.js environment was a little questionable. It took me a couple days to just get the hardware/software of the hardware situated. It was a time consuming part that I'm happy I started early with.
- What have you learned?
  - I learned the fundamentals of how to get a WoT operational from the hardware wiring and configuring a Raspberry Pi unit.
  - I gained some knowledge of the protocols and swiftly decided to go for te MQTT one.
  - To formulate a plan of the integration pattern early, something I did not do at first, however I will be very certain before starting an IoT project again if it will be Cloud Integration or even Direct Integration.
  - I learned that some hardware needs a 10k Resistor and that one needs to be very careful and certain when plugging in the hardware.
  - To appreciate the ease of use of Brokers such as Adafruit.
- What could you have done differently?
  - I could have separated the different parts of the project from the beginning as it would have caused me less grief with minor issues, especially when pushing to production. I did however learn a lesson from it now that I think back on it.
  - It believe my wiring could have been done differently to be less confusing for myself. It worked out in the end regardless and I came out wiser.

* Time Report

| Task                                        | Time     |
| ------------------------------------------- | -------- |
| Splitting Application into two              | 2 hours  |
| Raspbian installation                       | 2 hours  |
| Node Environment setup                      | 1 hour   |
| Raspberry hardware setup                    | 6 hours  |
| Raspberry Software setup, research included | 12 hours |
| Rest-API setup, research included           | 10 hours |
| Client-side creation                        | 6 hours  |
| Miscellaneous Research                      | 6 hours  |

### Further improvements

Further improvements of the assignment. What could you have done but did not have the time to complete?

- I could have used Adafruit's history on my temperature and humidity and make an awesome chart of how it has progressed over time.
- I could have made the frontend more appealing for the users that hop on to it, it is however fully functional with some work to be done, which however is not required.

### Extras

None. It is a functional temperature and humidity measurement which also gives you feedback on if you are having good readings based on https://www.sensitivechoice.com/indoor-humidity/ .

### Feedback

I found it to be a very fun task but of course, it also felt like I had to force everything into functioning at some points, I did not get the time to make the code as neat and proper as I might have prefered but nonetheless, I had fun doing it.

It was much appreciated that we were given some more time so that we may have a fighting chance in both courses final assignments.
