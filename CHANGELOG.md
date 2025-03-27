# Changelog

## [Unreleased]

## [0.12.20] - 2025-03-27

- Adds missing TS types lobby availability filter on users API. 
[#57](https://github.com/coconutcalendar/coconut-open-api-js/pull/57)

## [0.12.19] - 2025-03-27

- Adds support for a filter for lobby availability on users API. 
[#56](https://github.com/coconutcalendar/coconut-open-api-js/pull/56)

## [0.12.18] - 2025-03-26

- Adds support for preferred staff id and preferred language on queue-appointment API. 
[#55](https://github.com/coconutcalendar/coconut-open-api-js/pull/55)

## [0.12.17] - 2024-10-07

- Adds support for external ID on the client, adds to existing test 
cases that queue-appointment API is hit with correct external ID 
[#54](https://github.com/coconutcalendar/coconut-open-api-js/pull/54)

## [0.12.16] - 2023-06-15

- Added support for queue appointment endpoints [#53](https://github.com/coconutcalendar/coconut-open-api-js/pull/53)

## [0.12.15] - 2022-09-16

- Added location category filter to service and time slot resource [#49](https://github.com/coconutcalendar/coconut-open-api-js/pull/49)

## [0.12.14] - 2022-07-07

- Added recaptcha token as an optional parameter [#48](https://github.com/coconutcalendar/coconut-open-api-js/pull/48)

## [0.12.13] - 2022-06-21

- Added uploads method to let users attach files to the appointment booking and attendee add [#47](https://github.com/coconutcalendar/coconut-open-api-js/pull/47)

## [0.12.12] - 2022-03-30

- Releases new appointment filter [`69d0cc670a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/69d0cc670a)

## [0.12.11] - 2022-03-22

- Add user category filter in user resources [#43](https://github.com/coconutcalendar/coconut-open-api-js/pull/43)

## [0.12.10] - 2022-01-22

- Add location category filter [#39](https://github.com/coconutcalendar/coconut-open-api-js/pull/39)

## [0.12.9] - 2021-12-09

- Add google filter for time-slots [#38](https://github.com/coconutcalendar/coconut-open-api-js/pull/38)

## [0.12.8] - 2021-11-03

- Adds user category filter [#37](https://github.com/coconutcalendar/coconut-open-api-js/pull/37)

## [0.12.7] - 2021-10-25

- Add skip meeting link generation for appointments [#36](https://github.com/coconutcalendar/coconut-open-api-js/pull/36)

## [0.12.6] - 2021-10-14

- Add invite only resources filter [#35](https://github.com/coconutcalendar/coconut-open-api-js/pull/35)

## [0.12.5] - 2021-09-13

- Reorganizes methods and properties to be alphabetical [`52378a899f`](https://github.com/coconutcalendar/coconut-open-api-js/commit/52378a899f)
- Removes unnecessary/outdated warnings [`b210601d40`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b210601d40)
- Adds documentation for new wait time resource [`6001b86055`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6001b86055)
- Applies code linting fixes [`92e78b9fa1`](https://github.com/coconutcalendar/coconut-open-api-js/commit/92e78b9fa1)
- Removes end slash when not getting wait times for a specific location [`2d2cc5c0ed`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2d2cc5c0ed)
- Adds new wait time resource [`c6e293b9dc`](https://github.com/coconutcalendar/coconut-open-api-js/pull/30)

## [0.12.4] - 2021-06-01

- Adds ability to supply booking shortcut id to a booking [`d5cd4c9440`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d5cd4c9440)

## [0.12.3] - 2020-11-26

- Updates documentation for sending booked through value when adding an attendee to an appointment [`d80b13d353`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d80b13d353)
- Adds ability to send a booked through origin when adding an attendee to an appointment [`297efe58e2`](https://github.com/coconutcalendar/coconut-open-api-js/commit/297efe58e2)
- Updates documentation for sending booked through value when booking an appointment [`5d564acce6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5d564acce6)
- Adds ability to send a booked through origin when booking an appointment [`b3be5ea4ac`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b3be5ea4ac)

## [0.12.2] - 2020-11-10

- Moves query parameter to actual string since it does not work when calling patch [`dd977f56a3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/dd977f56a3)

## [0.12.1] - 2020-11-10

- Fixes improperly config for reschedule call [`81a26a9192`](https://github.com/coconutcalendar/coconut-open-api-js/commit/81a26a9192)

## [0.12.0] - 2020-11-10

- Updates documentation for reschedule method to show the newly required code parameter [`b0688b4617`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b0688b4617)
- Adds required code parameter to reschedule an appointment [`a4935ab970`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a4935ab970)

## [0.11.1] - 2020-11-10

- Add resource to services locations and users [`#19`](https://github.com/coconutcalendar/coconut-open-api-js/pull/19)

## [0.11.0] - 2020-10-20

- Updates documentation for cancel method to show the newly required code parameter [`2b9b2bdbc7`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2b9b2bdbc7)
- Adds required code parameter to cancel an appointment [`b556d27302`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b556d27302)
- Updates tests to ensure a confirmation code is passed when cancelling an attendee's appointment [`007069416e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/007069416e)

## [0.10.4] - 2020-10-20

- Adds additional users filter to time slots [`cd58720646`](https://github.com/coconutcalendar/coconut-open-api-js/commit/cd58720646)
- Adds additional users attribute when booking appointment [`b72216f6ad`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b72216f6ad)

## [0.10.3] - 2020-09-29

- Adds region filter to service and user resources [`b2e3fe51b0`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b2e3fe51b0)

## [0.10.2] - 2020-08-11

- Ensures an attendee alias is sent in the correct format when it is supplied [`9d8cc94faa`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9d8cc94faa)
- Updates existing test to ensure that when setting an attendee alias, it propagates to the request format correctly [`41b1658ecb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/41b1658ecb)
- Adds support for setting an external identifier / alias on an attendee model [`15473efbfe`](https://github.com/coconutcalendar/coconut-open-api-js/commit/15473efbfe)
- Adds test to set an external identifier / alias on an attendee model [`579408029e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/579408029e)

## [0.10.1] - 2020-05-19

- Adds support for adding a meeting method filter to a location resource [`4fd7dc90d9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4fd7dc90d9)
- Adds tests to support adding a meeting method filter to a location resource [`055aec3a48`](https://github.com/coconutcalendar/coconut-open-api-js/commit/055aec3a48)

## [0.10.0] - 2020-04-20

- Adds additional fake filter to the user api call to work with the assignments filter to ensure we are checking the correct field when narrowing users by meeting method support [`e4dd3f3e24`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e4dd3f3e24)
- Converts meeting_method filter being sent to new client_view_meeting_method filter to support the addition of staff only preferences [`3a05ee834b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3a05ee834b)

## [0.9.3] - 2020-04-16

- Adds ability to send timezone when booking or rescheduling appointments [`17c97d4ee4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/17c97d4ee4)

## [0.9.2] - 2020-04-15

- Adds ability to send supported locale along with a booking [`374ed0b475`](https://github.com/coconutcalendar/coconut-open-api-js/commit/374ed0b475)

## [0.9.1] - 2020-03-19

- Added support for filtering users by meeting method support [`#14`](https://github.com/coconutcalendar/coconut-open-api-js/pull/14)

## [0.9.0] - 2020-02-14

- Removes references to email in documentation for matching appointment lookup [`91755a34c2`](https://github.com/coconutcalendar/coconut-open-api-js/commit/91755a34c2)
- Removes necessity for sending email with appointment matchers when looking up an appointment [`a3f859d253`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a3f859d253)

## [0.8.3] - 2020-01-30

- Ensures meeting method is properly sent when fetching services [`c680536b24`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c680536b24)
- Adds tests to support filtering services by a given meeting method [`610b89c0f6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/610b89c0f6)

## [0.8.2] - 2020-01-17

- Documents exclusion ability when generating availability [`2a55872965`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2a55872965)
- Adds support for excluding an appointment identifier from time slot generation [`12c0735f50`](https://github.com/coconutcalendar/coconut-open-api-js/commit/12c0735f50)

## [0.8.1] - 2020-01-17

- Adds support for sending the meeting method when fetching time slots [`c4b7af5d57`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c4b7af5d57)

## [0.8.0] - 2020-01-17

- Adds default query param when setting locale on request to help with weird caching issues in some browsers [`6f97bfeb66`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6f97bfeb66)

## [0.7.6] - 2020-01-14

- Documents new meeting method setter and usage [`9141969677`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9141969677)
- Adds meeting method to appointment resource with appropriate constant declarations [`34661021cf`](https://github.com/coconutcalendar/coconut-open-api-js/commit/34661021cf)

## [0.7.5] - 2019-12-06

- Adds notifications to add attendee parameters when they are set [`901f9481f9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/901f9481f9)

## [0.7.4] - 2019-11-28

- Adds ability to set preferred filter on service resource [`ad5eb5be8b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ad5eb5be8b)
- Changes assignments filter to return a number to be more boolean safe over an http endpoint [`459f6028ab`](https://github.com/coconutcalendar/coconut-open-api-js/commit/459f6028ab)
- Adds ability to set preferred filter on location resource [`d75b667d8e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d75b667d8e)

## [0.7.3] - 2019-11-26

- Ensures a booker identifier can be sent when adding attendees to existing appointments [`44c92db1e5`](https://github.com/coconutcalendar/coconut-open-api-js/commit/44c92db1e5)
- Ensures booker will be sent when making a booking [`5b96f211a5`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5b96f211a5)
- Adds ability to provide an actingAs identifier which will later be used to identify the booker [`ff40f1f693`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ff40f1f693)

## [0.7.2] - 2019-11-22

- Documents new add method for adding attendees to existing appointments [`8e5bd68550`](https://github.com/coconutcalendar/coconut-open-api-js/commit/8e5bd68550)
- Adds test to ensure answers are also sent properly when supplied [`9f513e1f7c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9f513e1f7c)
- Extracts duplicated code to class method [`198022e5df`](https://github.com/coconutcalendar/coconut-open-api-js/commit/198022e5df)
- Adds call to add one or more attendees to an existing appointment [`43e250a869`](https://github.com/coconutcalendar/coconut-open-api-js/commit/43e250a869)
- Adds put method to axios mock [`f2c48e67a4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/f2c48e67a4)
- Adds test for ensuring a given attendee would be sent when adding to the appointment [`91b3e2d94d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/91b3e2d94d)

## [0.7.1] - 2019-11-22

- Documents new visibility method with example usage [`a123ee9703`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a123ee9703)
- Exports visibility constants [`aa2647f02b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/aa2647f02b)
- Ensures visibility filter will be sent along with request [`70ad475851`](https://github.com/coconutcalendar/coconut-open-api-js/commit/70ad475851)
- Adds visibility flag to time slot resource [`16a7377a4c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/16a7377a4c)

## [0.7.0] - 2019-11-14

- Fixes incorrect usage of delete axios request body data [`695bf35ee3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/695bf35ee3)

## [0.6.16] - 2019-11-06

- Adds appointment ID to the payload of the request to reschedule an appointment [`56b7815355`](https://github.com/coconutcalendar/coconut-open-api-js/commit/56b7815355)
- Adjusts tests to check for the appointment ID in the request payload [`f3ae4236e4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/f3ae4236e4)

## [0.6.15] - 2019-11-05

- Allows setting remaining UTM parameters on request to book appointment [`#10`](https://github.com/coconutcalendar/coconut-open-api-js/pull/10)

## [0.6.14] - 2019-11-01

- Adds test to verify appointment can be rescheduled with notification parameters set [`490771bb5d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/490771bb5d)
- Updates documentation to describe the new functionality for rescheduling an appointment [`7217391933`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7217391933)
- Allows an appointment to be rescheduled [`de18020baa`](https://github.com/coconutcalendar/coconut-open-api-js/commit/de18020baa)
- Adds test for rescheduling an appointment [`88642e928f`](https://github.com/coconutcalendar/coconut-open-api-js/commit/88642e928f)

## [0.6.13] - 2019-09-30

- Fixes spacing on if condition [`3edc9e9a9d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3edc9e9a9d)
- Updates documentation to describe the new functionality for setting the source of an appointment [`a16cadadcf`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a16cadadcf)
- Allows the source of the appointment to be set (ie. the UTM source) [`70b42b70c9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/70b42b70c9)
- Updates test to also use and check for the new source parameter [`dc0ba2d62e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/dc0ba2d62e)
- Adds test for setting the source property [`511510e65c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/511510e65c)

## [0.6.12] - 2019-09-26

- Adds ability to set invitation property to appointment resource, and appropriate test. [`5e3e6eef09`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5e3e6eef09)

## [0.6.11] - 2019-09-02

- Adds documentation for supported locales on time slots [`2c3843ecbe`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2c3843ecbe)
- Ensures supplied supported locales are sent along with the api request appropriately [`a336c6cf65`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a336c6cf65)
- Adds ability to set a supported locale filter [`93169589cd`](https://github.com/coconutcalendar/coconut-open-api-js/commit/93169589cd)

## [0.6.10] - 2019-08-27

- Adds method for setting an accept language header [`ea90179251`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ea90179251)
- Adds test for setting an accept-language header [`1150869049`](https://github.com/coconutcalendar/coconut-open-api-js/commit/1150869049)

## [0.6.9] - 2019-08-24

- Adds ability to supply a country to narrow down timezones [`692ff3d1f7`](https://github.com/coconutcalendar/coconut-open-api-js/commit/692ff3d1f7)

## [0.6.8] - 2019-08-22

- Sends token during details call instead of just removing it [`22732538e0`](https://github.com/coconutcalendar/coconut-open-api-js/commit/22732538e0)

## [0.6.7] - 2019-08-22

- Adds token generation and handling for grouping autocomplete and details calls [`72a25ce8cb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/72a25ce8cb)

## [0.6.6] - 2019-08-21

- Adds documentation for location details endpoint [`db73fdc974`](https://github.com/coconutcalendar/coconut-open-api-js/commit/db73fdc974)
- Adds ability to fetch location details [`a9173c13e3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a9173c13e3)

## [0.6.5] - 2019-08-20

- Adds documentation for suggestion endpoint [`5add582207`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5add582207)
- Adds location suggestions handling [`27185eb752`](https://github.com/coconutcalendar/coconut-open-api-js/commit/27185eb752)

## [0.6.4] - 2019-08-19

- Documents new location resource method. Adds forgotten reference to method on interface [`cd2b0f1c59`](https://github.com/coconutcalendar/coconut-open-api-js/commit/cd2b0f1c59)

## [0.6.3] - 2019-08-19

- Implements locatable filters for location resource [`3a6d37c910`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3a6d37c910)
- Adds tests for supplying locatable information for the location resource [`e19141dc1c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e19141dc1c)

## [0.6.2] - 2019-07-15

- Updates documentation for responses in regards to cancelling an appointment. Ensures response model is exportable [`1a5f451c74`](https://github.com/coconutcalendar/coconut-open-api-js/commit/1a5f451c74)
- Adds ability to submit responses along with cancelling an appointment [`4cc792009a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4cc792009a)
- Adds response model with appropriate tests [`891f793edc`](https://github.com/coconutcalendar/coconut-open-api-js/commit/891f793edc)

## [0.6.1] - 2019-07-15

- Adds basic documentation for new forms resource [`fc4d2a4a58`](https://github.com/coconutcalendar/coconut-open-api-js/commit/fc4d2a4a58)
- Implements necessary methods for form resource [`111923287b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/111923287b)
- Adds accessor for form resource [`e8f8fc5605`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e8f8fc5605)

## [0.6.0] - 2019-07-08

- Ensures attendees messageable attribute can be set to false [`d7cbf0193c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d7cbf0193c)

## [0.5.4] - 2019-07-05

- Adds missing notes to attendee request parameters [`7c4e417e5f`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7c4e417e5f)

## [0.5.3] - 2019-06-25

- Adds new filter to user resource [`ed5490539d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ed5490539d)

## [0.5.2] - 2019-06-24

- Switches questions service filter to use new filter on backend which is more inline on what we are wanting to retrieve [`7f43f429d6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7f43f429d6)

## [0.5.1] - 2019-06-20

- Ensures group filters are sent with request when provided [`632ace302c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/632ace302c)
- Adds group and individual filters to service resource [`2151c0b9cc`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2151c0b9cc)
- Ensures virtual filters are sent with request when provided [`5536eea650`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5536eea650)
- Adds virtual and physical filters to location resource [`d0007e5bf5`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d0007e5bf5)
- Ensures timezone filter is sent with request when provided [`3456efe551`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3456efe551)
- Adds timezone filter to time slot resource [`8ad5ea7cab`](https://github.com/coconutcalendar/coconut-open-api-js/commit/8ad5ea7cab)

## [0.5.0] - 2019-06-04

- Changes all getters to public methods [`df87d3d429`](https://github.com/coconutcalendar/coconut-open-api-js/commit/df87d3d429)

## [0.4.0] - 2019-06-04

- Fixes improperly named filter parameters [`32f59f0bf9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/32f59f0bf9)

## [0.3.5] - 2019-05-28

- Adds timezone resource [`cef6cd2981`](https://github.com/coconutcalendar/coconut-open-api-js/commit/cef6cd2981)

## [0.3.4] - 2019-05-18

- Updates typings to include the conditional resource [`d38fba9aa2`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d38fba9aa2)

## [0.3.3] - 2019-05-14

- Adds conditional method to most resources [`5d293405b9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5d293405b9)

## [0.3.2] - 2019-05-13

- Allows domain to be optional when constructing the client [`663e9f8d1d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/663e9f8d1d)

## [0.3.1] - 2019-01-15

### Fixed
- Fixes improperly named import [`10825f1727`](https://github.com/coconutcalendar/coconut-open-api-js/commit/10825f1727)

## [0.3.0] - 2019-01-15

### Added
- Adds link to official api documentation [`8b070dc163`](https://github.com/coconutcalendar/coconut-open-api-js/commit/8b070dc163)
- Adds missing documentation. Updates examples to not use hard coded values [`c70cb51bf7`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c70cb51bf7)
- Adds preference model documentation [`07f16da18b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/07f16da18b)
- Adds documentation for answer and attendee models [`3006df17f3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3006df17f3)
- Converts export to not use default. Exports model classes from entrypoint. Updates existing documentation [`6cf45fdaa6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6cf45fdaa6)
- Adds accessors for appointment and wait list resources [`60a0618c89`](https://github.com/coconutcalendar/coconut-open-api-js/commit/60a0618c89)
- Adds appointment resource documentation without examples [`2bb8d7e445`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2bb8d7e445)
- Adds wait list resource documentation without examples [`b929edfc3f`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b929edfc3f)
- Adds user resource documentation [`4f7ca7d393`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4f7ca7d393)
- Adds time slots resource documentation [`80ec0d52ed`](https://github.com/coconutcalendar/coconut-open-api-js/commit/80ec0d52ed)
- Adds settings resource documentation [`6c37e5751e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6c37e5751e)
- Adds question resource documentation [`9defa80d41`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9defa80d41)
- Adds service resource documentation [`9aafb048ef`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9aafb048ef)
- Adds location resource documentation [`d24e1ac152`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d24e1ac152)
- Exports constants [`ff77db1be9`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ff77db1be9)

### Fixed
- Fixes improperly named section [`073970f67a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/073970f67a)

## [0.2.1] - 2018-12-03

### Added
- Adds invitable filter to location and service resources [`8e7de92e15`](https://github.com/coconutcalendar/coconut-open-api-js/commit/8e7de92e15)

## [0.2.0] - 2018-11-30

### Added
- Adds install instructions, changelog link and testing instructions to readme [`3cb6230fed`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3cb6230fed)
- Adds npm badges [`5225b982b4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5225b982b4)

### Changed
- Converts filter output to match expected query string for users [`3bcc9a06b2`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3bcc9a06b2)
- Converts filter output to match expected query string for services [`26a3bb4cf8`](https://github.com/coconutcalendar/coconut-open-api-js/commit/26a3bb4cf8)
- Converts filter output to match expected query string for questions [`9d975f49e3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/9d975f49e3)
- Converts filter output to match expected query string for locations resource [`839d9dd1bf`](https://github.com/coconutcalendar/coconut-open-api-js/commit/839d9dd1bf)

## 0.1.0 - 2018-11-19

### Added
- Adds update endpoint to wait list resource [`ad51ef4918`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ad51ef4918)
- Handles optional information when creating wait list request [`1392548c6b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/1392548c6b)
- Adds create wait list endpoint [`f5c8206f1c`](https://github.com/coconutcalendar/coconut-open-api-js/commit/f5c8206f1c)
- Adds preferences and additional notes setters [`22d24cede0`](https://github.com/coconutcalendar/coconut-open-api-js/commit/22d24cede0)
- Adds missing mocked out tests [`cc977a9f68`](https://github.com/coconutcalendar/coconut-open-api-js/commit/cc977a9f68)
- Adds extra mocked up tests for better coverage [`5588aa7132`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5588aa7132)
- Implements retrieve wait list request endpoint for resource [`563b6be1ae`](https://github.com/coconutcalendar/coconut-open-api-js/commit/563b6be1ae)
- Adds removal endpoint for wait list resource [`87fe76bc97`](https://github.com/coconutcalendar/coconut-open-api-js/commit/87fe76bc97)
- Mocks out tests for action based methods [`d926578ca3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d926578ca3)
- Adds url parameter setters [`7310df4243`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7310df4243)
- Adds location, service and user filter to wait list resource [`93401ed576`](https://github.com/coconutcalendar/coconut-open-api-js/commit/93401ed576)
- Adds mocked out wait list resource and interface [`285e39d73b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/285e39d73b)
- Implements book endpoint with associated tests [`09439391aa`](https://github.com/coconutcalendar/coconut-open-api-js/commit/09439391aa)
- Implements retrieve appointment method [`2337c8e33a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2337c8e33a)
- Implements cancel method [`998fd3e898`](https://github.com/coconutcalendar/coconut-open-api-js/commit/998fd3e898)
- Implements initial version of appointment resource [`630c5b7324`](https://github.com/coconutcalendar/coconut-open-api-js/commit/630c5b7324)
- Adds stubbed out appointment resource and interfaces [`d74b703558`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d74b703558)
- Implements remaining setters for attendee model [`a6ca7e5b00`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a6ca7e5b00)
- Adds messagable attribute setter [`7c84776bfd`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7c84776bfd)
- Implements location detail parameters [`c0bf907ac0`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c0bf907ac0)
- Adds answers attribute setter [`5102744265`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5102744265)
- Adds base model for attributes getter [`b7320a2d28`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b7320a2d28)
- Adds missing answers parameter. Reorders parameters [`ab22acab62`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ab22acab62)
- Adds pre-planned interfaces and type definitions [`551ce0f421`](https://github.com/coconutcalendar/coconut-open-api-js/commit/551ce0f421)
- Adds test to increase coverage [`12da14decb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/12da14decb)
- Adds preference model [`4df6815cab`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4df6815cab)
- Adds answer model [`e12b2e9983`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e12b2e9983)
- Adds slot accessor and test [`a8f1e81f38`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a8f1e81f38)
- Adds time slot resource and tests [`39152d7ca1`](https://github.com/coconutcalendar/coconut-open-api-js/commit/39152d7ca1)
- Adds location accessor to main class [`6a9c91ffa4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6a9c91ffa4)
- Adds location resource and associated tests [`a058ed8140`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a058ed8140)
- Adds service resource with associated tests [`a95fdf17b7`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a95fdf17b7)
- Adds setting resource with accompanying tests [`682f1bbe15`](https://github.com/coconutcalendar/coconut-open-api-js/commit/682f1bbe15)
- Adds on and take as options for a resource [`c8f7ba0b53`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c8f7ba0b53)
- Adds conduct and template files [`f9b700b10d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/f9b700b10d)
- Adds start of new badges. Adds license [`71c3373fd5`](https://github.com/coconutcalendar/coconut-open-api-js/commit/71c3373fd5)
- Adds jest to global install [`4d3ab8118e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4d3ab8118e)
- Adds codecov instructions for travis-ci [`4009fa9342`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4009fa9342)
- Adds missing tests for coverage [`4e90a5aa35`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4e90a5aa35)
- Adds test for property instance [`5e1468c284`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5e1468c284)
- Adds initial travis config [`5803eda821`](https://github.com/coconutcalendar/coconut-open-api-js/commit/5803eda821)
- Adds open api options and new tests for base class and client [`6a78c56712`](https://github.com/coconutcalendar/coconut-open-api-js/commit/6a78c56712)
- Adds initial tests and mock for user resource [`3e0c42f7eb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3e0c42f7eb)
- Sets root dir for jest. Adds test watch command [`0c77118526`](https://github.com/coconutcalendar/coconut-open-api-js/commit/0c77118526)
- Adds initial implementation of user resource with types [`2889f19919`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2889f19919)
- Adds hook scripts [`c9e0706b71`](https://github.com/coconutcalendar/coconut-open-api-js/commit/c9e0706b71)
- Adds jest and config files [`ccc1f47edb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ccc1f47edb)
- Adds npmignore [`a7b3e09f1b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a7b3e09f1b)
- Adds prettier and new npm scripts [`4c1d651e2d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/4c1d651e2d)
- Adds typescript and basic npm scripts [`eea9c494a4`](https://github.com/coconutcalendar/coconut-open-api-js/commit/eea9c494a4)
- Initial commit [`47f8644eeb`](https://github.com/coconutcalendar/coconut-open-api-js/commit/47f8644eeb)

### Changed
- Moves interfaces to correct classes for better declaration of distributed types [`a532c16fa8`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a532c16fa8)
- Updates package name [`68d602629a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/68d602629a)
- Runs prettier formatter [`a8ce9c6238`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a8ce9c6238)
- Converts to template strings [`7bdd3d2967`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7bdd3d2967)
- Changes test method to matching method for other spots [`408c4aee7a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/408c4aee7a)
- Moves relationships away from filter setup to relationship setup. Adds attendee relationship setter [`bfe94df142`](https://github.com/coconutcalendar/coconut-open-api-js/commit/bfe94df142)
- Extracts more code and renames methods [`67a8edf917`](https://github.com/coconutcalendar/coconut-open-api-js/commit/67a8edf917)
- Converts multiple properties into filter and relationships properties [`0d9f09a92f`](https://github.com/coconutcalendar/coconut-open-api-js/commit/0d9f09a92f)
- Extracts small part of object to model method [`d9ab8f914b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d9ab8f914b)
- Brings coverage back up to 100 percent [`ae0a226fa6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ae0a226fa6)
- Refactors tests that were checking unnecessary attributes [`14802ffb8e`](https://github.com/coconutcalendar/coconut-open-api-js/commit/14802ffb8e)
- Converts interface names [`796b66ee56`](https://github.com/coconutcalendar/coconut-open-api-js/commit/796b66ee56)
- Adjusts answer tests [`59a907da2b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/59a907da2b)
- Updates model with interfaces and changes to attribute based setup for better typing [`11ae9de5c3`](https://github.com/coconutcalendar/coconut-open-api-js/commit/11ae9de5c3)
- Switches generic interface to proper one [`eb122b86b7`](https://github.com/coconutcalendar/coconut-open-api-js/commit/eb122b86b7)
- Adds question resource [`25acaa8d05`](https://github.com/coconutcalendar/coconut-open-api-js/commit/25acaa8d05)
- Adds service getter [`7c310ed144`](https://github.com/coconutcalendar/coconut-open-api-js/commit/7c310ed144)
- Renames interface to more suitable name [`88d5a9018a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/88d5a9018a)
- Moves methods to new interface to account for none-listable resources [`cc99c49c4b`](https://github.com/coconutcalendar/coconut-open-api-js/commit/cc99c49c4b)
- Cleans code style [`f6078c5d95`](https://github.com/coconutcalendar/coconut-open-api-js/commit/f6078c5d95)
- Changes to before install in hopes of not missing packages [`00ed8e4474`](https://github.com/coconutcalendar/coconut-open-api-js/commit/00ed8e4474)
- Updates travis config [`2f4902b540`](https://github.com/coconutcalendar/coconut-open-api-js/commit/2f4902b540)
- Excludes mocks and test files from distributed files [`57e474f5ef`](https://github.com/coconutcalendar/coconut-open-api-js/commit/57e474f5ef)
- Finishes unit tests for user resource [`b10d60fe27`](https://github.com/coconutcalendar/coconut-open-api-js/commit/b10d60fe27)
- Cleans up code formatting [`72f0af8fe2`](https://github.com/coconutcalendar/coconut-open-api-js/commit/72f0af8fe2)
- Changes variable name to make more sense [`45e4befbf6`](https://github.com/coconutcalendar/coconut-open-api-js/commit/45e4befbf6)
- Converts parameter name to make more since since its a single value [`75a78ca566`](https://github.com/coconutcalendar/coconut-open-api-js/commit/75a78ca566)
- Converts get method to use async await [`ad9529e560`](https://github.com/coconutcalendar/coconut-open-api-js/commit/ad9529e560)
- Switches to rollup over straight tsc [`a95a841598`](https://github.com/coconutcalendar/coconut-open-api-js/commit/a95a841598)
- Formats code using prettier [`e507d54609`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e507d54609)
- Adjusts main path. Adds types path [`e6ae35d62d`](https://github.com/coconutcalendar/coconut-open-api-js/commit/e6ae35d62d)
- Updates ignored folders [`883c5202da`](https://github.com/coconutcalendar/coconut-open-api-js/commit/883c5202da)

### Removed
- Removes comments from output [`0ffe2b2570`](https://github.com/coconutcalendar/coconut-open-api-js/commit/0ffe2b2570)
- Removes es build [`1aec1d3132`](https://github.com/coconutcalendar/coconut-open-api-js/commit/1aec1d3132)
- Removes mocked call chain [`3c253abd0a`](https://github.com/coconutcalendar/coconut-open-api-js/commit/3c253abd0a)
- Removes ill-thought out version option [`d159644516`](https://github.com/coconutcalendar/coconut-open-api-js/commit/d159644516)

[Unreleased]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.14...HEAD
[0.12.14]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.13...v0.12.14
[0.12.13]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.12...v0.12.13
[0.12.12]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.11...v0.12.12
[0.12.11]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.10...v0.12.11
[0.12.10]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.9...v0.12.10
[0.12.9]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.8...v0.12.9
[0.12.8]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.7...v0.12.8
[0.12.7]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.6...v0.12.7
[0.12.6]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.5...v0.12.6
[0.12.5]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.4...v0.12.5
[0.12.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.3...v0.12.4
[0.12.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.2...v0.12.3
[0.12.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.1...v0.12.2
[0.12.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.10.4...v0.11.0
[0.10.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.10.3...v0.10.4
[0.10.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.10.2...v0.10.3
[0.10.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.10.1...v0.10.2
[0.10.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.9.3...v0.10.0
[0.9.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.8.3...v0.9.0
[0.8.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.6...v0.8.0
[0.7.6]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.5...v0.7.6
[0.7.5]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.4...v0.7.5
[0.7.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.3...v0.7.4
[0.7.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.16...v0.7.0
[0.6.16]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.15...v0.6.16
[0.6.15]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.14...v0.6.15
[0.6.14]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.13...v0.6.14
[0.6.13]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.12...v0.6.13
[0.6.12]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.11...v0.6.12
[0.6.11]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.10...v0.6.11
[0.6.10]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.9...v0.6.10
[0.6.9]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.8...v0.6.9
[0.6.8]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.7...v0.6.8
[0.6.7]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.6...v0.6.7
[0.6.6]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.5...v0.6.6
[0.6.5]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.4...v0.6.5
[0.6.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.3...v0.6.4
[0.6.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.5.4...v0.6.0
[0.5.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.5.3...v0.5.4
[0.5.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.5...v0.4.0
[0.3.5]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/coconutcalendar/coconut-open-api-js/compare/v0.1.0...v0.2.0
