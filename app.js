(function () {

    // Create the promise chain here



    Vue.component('geomap', {
        props: ['detail'],
        template: `
        <div>
        <h2>{{detail}}</h2>
        
        
        </div>
        `
    })

    var vm = new Vue({
        el: '#map',
        data: {
            weatherData: {},
            guidData: {}
        },
        // created:function()
        methods: {
            getCity: function (zip) {

                var urlBase = 'http://api.zippopotam.us/us/';
                var url = urlBase + zip;

                return new Promise(function (resolve, reject) {

                    $.get(url).then(
                        function (data) {
                            resolve(data);
                        },
                        function (error) {
                            reject(error);
                        }
                    );
                });
            },

            getWeather: function (cityData) {

                var zip = cityData['postal code'];
                var urlBase = 'http://api.openweathermap.org/data/2.5/';
                var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
                var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;

                return new Promise(function (resolve, reject) {

                    $.get(url).then(
                        function (data) {
                            resolve(data);
                        },
                        function (error) {
                            reject(error);
                        }
                    );
                });
            },

            getGuid: function () {

                var url = 'http://www.setgetgo.com/guid/get.php';

                return new Promise(function (resolve, reject) {

                    $.get(url)
                        .then(
                        function (guid) {
                            resolve(guid);
                        },
                        function (error) {
                            reject(error);
                        });
                });
            },
            setData(d){
                console.log('the data', d)
                this.weatherData = d
            }
        }
    })

    vm.getCity(83706)
        .then(vm.getWeather)
        .then(vm.setData)
        // .then(d => vm.setData(d))
        // .then(data => console.log(data))
        .then(vm.getGuid)
        .then(console.log(vm.weatherData))
        .then(data => console.log('GUID',data))
        .catch(err => console.error("Not valid"))





})();