 var app = angular.module('landingPage',[]);
 app.controller('customersController',function($scope, $http){
    $scope.customers = [];
    $scope.regularCustomers = [];
    $scope.www = "www";
    $scope.noteOrComment = true;
    
    $scope.newCustOpt = [{
            itemName:"Name",
            itemValue:"name"
        },
                             {
            itemName:"Phone",
            itemValue:"phone"
        },
                             {
            itemName:"E-mail",
            itemValue:"email"
        },
                             {
            itemName:"Registration date",
            itemValue:"regDate"
        }
                            ];
     
     $scope.newSelectedOpt = $scope.newCustOpt[0];
     
     $scope.regCustOpt = [{
            itemName:"Name",
            itemValue:"name"
        },
        {
            itemName:"Phone",
            itemValue:"phone"
        },
        {
            itemName:"E-mail",
            itemValue:"email"
        },
        {
            itemName:"Registration date",
            itemValue:"regDate"
        },
        {
            itemName:"Priority",
            itemValue:"priority"
        },
        {
            itemName:"Note",
            itemValue:"commentStatus"
        },
        {
            itemName:"Status",
            itemValue:"status"
        }
                            ];
     
     $scope.regSelectedOpt = $scope.newCustOpt[0];
     
    $http.get('php/getNewCustumers.php')
        .then(function(custumers){                                                       $scope.customers = custumers.data.customers;
        });
     $http.get('php/getRegularCustomers.php')
        .then(function(custumers){                                                       $scope.regularCustomers = custumers.data.regularCustomers;
        });
     
     
    $scope.findNewCustomer = function(id){
        for(var i = 0; i < $scope.customers.length; i++){
            if($scope.customers[i].id == id){
                return i;
                
            }
        }
    }
    $scope.findRegCustomer = function(id){
        for(var i = 0; i < $scope.regularCustomers.length; i++){
            if($scope.regularCustomers[i].id == id){
                return i;
                
            }
        }
    }
     
    $scope.makeMedium = function(id){
        
        $scope.customers[$scope.findNewCustomer(id)].priority = "Medium";
        
    } 
    
    $scope.makeLow = function(id){
        $scope.customers[$scope.findNewCustomer(id)].priority = "Low";
    } 
    
    $scope.noteIndex = 0;
     
    $scope.addNoteIndex = function(id){
        $scope.noteIndex = $scope.findNewCustomer(id);
        $("#textAreaC").removeAttr("disabled",true);
        $scope.noteOrComment = true;
        $scope.note = "";
    }
    
    $scope.addNote = function(i){
        $scope.customers[$scope.noteIndex].comment = $scope.note;
        $scope.customers[$scope.noteIndex].commentStatus = "endabled";
        $scope.note = "";
        $("#noteMainCover").fadeOut(300);
        
        
    }
     
     
    $scope.addToRegular = function(id){
        $http.post('php/addToRegular.php',$scope.customers[$scope.findNewCustomer(id)])
        .then(function(){                                                                     
                                  
        });
        var index = $scope.regularCustomers.length;
        $scope.regularCustomers.push($scope.customers[$scope.findNewCustomer(id)]);
        $scope.customers.splice($scope.findNewCustomer(id),1);
    }
    
    $scope.viewNoteIndexReg = function(comment){
        
        $scope.note = comment;
        $scope.noteOrComment = false;
        
    }
    $scope.deleteCUstomerFromNew = function(id){
        var data = {
            id: id,
            from: "new"
        }
        
        $http.post('php/deleteCustomer.php',data)
        .then(function(response){     
            $scope.customers.splice($scope.findNewCustomer(id),1);
            
        });
    }
    $scope.deleteCUstomerFromReg = function(id){
        var data = {
            id: id,
            from: "reg"
        }
        
        $http.post('php/deleteCustomer.php',data)
        .then(function(response){     
            $scope.regularCustomers.splice($scope.findRegCustomer(id),1);
            
        });
    }
    
    $scope.changeStat = function(id){
        
        
        if($scope.regularCustomers[$scope.findRegCustomer(id)].status == "progress"){
            $scope.regularCustomers[$scope.findRegCustomer(id)].status = "finish";
            var data = {
                status:"finish",
                id:id
            }
            $http.post('php/changestatus.php',data)
        .then(function(response){     
        });
        }
        else{
            $scope.regularCustomers[$scope.findRegCustomer(id)].status = "progress";
            var data = {
                status:"progress",
                id:id
            }
            $http.post('php/changestatus.php',data)
        .then(function(response){     
        });
        }
        
    }
    
});