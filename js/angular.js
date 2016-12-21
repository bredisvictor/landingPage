var app = angular.module("landingPage",[]);
app.controller("form",function($scope,$http){
    
    $scope.phoneFirst = [
        {
            num:"054",
            val:"054-"
        },
        {
            num:"050",
            val:"050-"
        },
        {
            num:"053",
            val:"053-"
        },
        {
            num:"077",
            val:"077-"
        }
    ];
    $scope.valNum = $scope.phoneFirst[0];
    $scope.createCustomer = function(){
    $scope.user.name = $scope.user.name.join(" ");
    $scope.user.firstPhone = $scope.valNum.val;    
        var d=new Date();
        var day= d.getDate();
        var month= d.getMonth()+1;
        var year= d.getFullYear();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        
        function checkTime(i){
            if (i<10){
                i="0" + i;
            }
            return i;
        }
        
        $scope.user.date = day+"."+month+"."+year+" | "+checkTime(hour)+":"+checkTime(minutes)+":"+checkTime(seconds);
        $scope.firstEnter = false;
        $http.post('../landingpage/php/addCustomer.php', $scope.user )
                    .then(function(back){  
                    $scope.user.name = "";
                    $scope.user.phone = "";
                    $scope.user.email = "";
                    $scope.user.agreed = false;
                    $scope.sendForm.$setPristine();
                    
                    $("#sent").css("display","block");
                if(back.data == "error"){
                    $("#sent").css("color","#eb1116");
                    $("#sent").text(back.data);
                }
                else{
                    $("#sent").css("color","#A6EB20");
                    $("#sent").text(back.data);
                }
        });
    }
    
    $scope.getError = function(error){
        if(angular.isDefined(error)){
            if(error.required){
                return "Field can't to be empty"
            }
            else if(error.fullName){
                
                return "Enter you'r 'FULL' name";
            }
            else if(error.myEmail){
                return "Enter an correct e-mail";
            }
            else if(error.myPhone){
                return "Enter a numbers and not more then 11 symbhols";
            }
        }
    }
});


app.directive('fullName', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(name) {
                name = name.split(" ");
                
                if (name.length>1){
                    ctrl.$setValidity('fullName', true);
                    return name;
                } else {
                    ctrl.$setValidity('fullName', false);
                    return undefined;
                }
            });
        }
    };
});

app.directive('myEmail', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(email) {
                
                var emailIncorrect = "@";
            var emailIncorrect2 = ".";
            var emailTrue = false;
            var emailTrue2 = false;
            var simbhols = "[]{}/“‘, ";
            var simbFound = false;
            
                
            for(var i = 0; i < email.length; i++){
                
                if(emailIncorrect.indexOf(email.charAt(i)) >= 0)  {
                    emailTrue = true;
                    
                }
                if(emailIncorrect2.indexOf(email.charAt(i)) >= 0)  {
                    emailTrue2 = true;
                    
                }
                if(simbhols.indexOf(email.charAt(i)) != -1){
                        simbFound = true;
                       
                }
                
            }
            if(!emailTrue || !emailTrue2 || simbFound ){
                ctrl.$setValidity('myEmail', false);
                    return undefined;
            }
            else if(email.indexOf("@") == 0 || email.indexOf(".") == 0 || email.charAt(email.length - 1) == "@" || email.charAt(email.length - 1) == "."  ){
                ctrl.$setValidity('myEmail', false);
                    return undefined;
            }
            else if(email.indexOf("@") > email.indexOf(".")){
                ctrl.$setValidity('myEmail', false);
                    return undefined;
            }
            else if(email.indexOf("@")+1 == email.indexOf(".")){
                ctrl.$setValidity('myEmail', false);
                    return undefined;
            }
            else{
                ctrl.$setValidity('myEmail', true);
                    return email;
            }
            });
        }
    };
});

app.directive('myPhone', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(phone) {
                var num = "1234567890";
                var error = false;
                for(var i = 0; i < phone.length; i++){
                    if(num.indexOf(phone.charAt(i)) == -1)  {
                            error = true;
                    }
                }
                if(error || phone.length>8){
                    ctrl.$setValidity('myPhone', false);
                    return undefined;
                }
                else{
                    ctrl.$setValidity('myPhone', true);
                    return phone;
                }
            });
        }
    };
});