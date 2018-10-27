angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})
.controller('findFormCtrl', function($scope, $rootScope, $timeout) {
	$scope.slideIndex = 1;
	
	$scope.showDivs = function(n){
		var i;
		var x = document.getElementsByClassName("mySlides");
		if (n > x.length) {$scope.slideIndex = 1}    
		if (n < 1) {$scope.slideIndex = x.length}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";  
		}
		x[$scope.slideIndex-1].style.display = "block"; 
	};
	$scope.plusDivs = function(n) {
		$scope.showDivs($scope.slideIndex += n);
	}
	$scope.show = function() {
		document.getElementById("ctrlbutton").classList.remove("hide");
		$scope.plusDivs(0);
	};
})

.controller('HomeCtrl', function($scope, $rootScope, $interval, $ionicPlatform, logincheck) {
	var tip = ["ถั่วแมคคาเดเมียจะทำให้กล้ามเนื้อสุนัขอ่อนแรง โดยจะส่งผลกับขาหลังของสุนัข อาจเป็นหนักถึงอัมพาต",
	"ไข่ดิบจะทำให้สุนัขขาดไบโอติน ผลก็คือ ผิวจะแห้ง และเป็นเกล็ดขุยๆ ขนหลุดร่วง เจริญเติบโตช้ากว่าปกติ",
	"ผักบุ้ง (Morning glory) เป็นโทษกับสุนัข",
	"พลูด่าง (Golden pothos) หากสุนัขกินเข้าไปแล้ว จะทำให้เกิดการระคายเคืองภายในช่องปาก",
	"สุนัขสามารถสื่อสารบอกอารมณ์ด้วยหางของมัน การกระดิกหางเป็นภาษากายที่กำลังบอกว่า ดีใจ",
	"สุนัขส่วนใหญ่ไม่มีเอนไซม์ใช้ย่อยน้ำตาลแลคโตสในนมวัว จะทำให้เกิดท้องเสีย อาเจียน และเซื่องซึม",
	"หัวหอมและกระเทียม จะไปทำลายเซลล์เม็ดเลือดแดง ส่งผลให้สุนัขเป็นโรคโลหิตจาง และโรคเลือดไหลไม่หยุด",
	"ปรงสาคู (Cycas revoluta) เสี่ยงเป็นอันตรายต่อชีวิตสุนัข",
	"การลูบไล้จะช่วยลดความดันโลหิตของแมวได้",
	"แมวตั้งท้องประมาณ 62 - 65 วัน นับจากวันที่ผสมจนถึงวันคลอด",
	"แมวมีความไวต่อแรงสั่นสะเทือนสูงมาก ดังนั้นแมวจะได้รับสัมผัสแรงสั่นสะเทือนแผ่นดินไหวได้ก่อนมนุษย์ 10 - 15 นาที",
	"ปัสสาวะของแมวจะเรืองแสง เมื่อถูกส่งด้วยแสงแบล๊คไลท์",
	"ปกติแมวจะไม่ร้องเสียงเหมืยวใส่แมวตัวอื่น จะร้องเสียงนี้ใส่คนเท่านั้น แต่จะทำเสียงครวญครางและเสียงขู่ใส่แมวตัวอื่น",
	"แมวเพศเมียมักถนัดใช้มือขวา ส่วนแมวเพศผู้มักถนัดซ้าย",
	"แมวไม่มีต่อมเหงื่อ ยกเว้นที่อุ้งเท้า",
	"แมวทำเสียงต่างๆได้ประมาณ 100 เสียง ในขณะที่สุนัขทำได้แค่ 10 เสียง ",
	"ถ้าแมวเอาหน้าเขาไปถูกับตัวคุณ แปลว่าเขายอมรับและแสดงความรักกับคุณ",
	"หากเจ้าเหมียวเจอหน้าคุณแล้วพวกมันยกหางชี้ตรง ปลายหางแกว่งเล็กน้อย แสดงว่าพวกมันกำลังแสดงความรักต่อคุณ",
	"การเคี้ยวเนื้อสดจะช่วยให้เหงือกและฟันของแมวมีสุขภาพที่ดีและแข็งแรงยิ่งขึ้น",
	"วิธีการอุ้มกระต่าย ต้องทำให้รู้สึกผ่อนคลายโดยการลูบขนเบาๆ จากนั้นเอามือสอดเข้าไปใต้ท้องแล้วดึงเข้ามาแนบลำตัว",
	"อย่าหิ้วหูกระต่ายเด็ดขาด!!",
	"กระต่ายเป็นสัตว์ที่ชอบหลบซ่อนอยู่ในมุมมืด",
	"ไม่ควรให้กระต่ายกินอาหารเม็ดเพียงอย่างเดียว",
	"กระต่ายเป็นสัตว์ที่เครียดง่ายและชอบให้ลูบหัว",
	"กระต่ายเป็นสัตว์สังคมชอบอยู่รวมกันหลายตัว",
	"หนูแฮมสเตอร์ชอบกินไข่ต้มที่ต้มสุก",
	"กระรอกมีการสะสมหรือซ่อนอาหารไว้กินในฤดูหนาว",
	"ต้นบอนสี (Caladium) เป็นพืชที่มีพิษกับสุนัข หรือแมว"];

	$scope.tipOf= "ช็อตโกแลต เป็นอาหารต้องห้ามของเหล่าสัตว์เลี้ยง";
	$scope.randomtip= function () {
		$scope.tipOf = tip[Math.floor(Math.random()*tip.length)];
	}
	$interval( function(){ $scope.randomtip(); }, 10000);
	$scope.go = function () {		
		logincheck.go();
	}
})

.controller('LoginCtrl', function($scope, $state, logincheck) {
	$scope.login = function () {		
		logincheck.enter();
		$state.go("app.home");
	};	
})

.controller('ProfileCtrl', function($scope, $state, logincheck) {
	$scope.logout = function () {		
		logincheck.leave();
	};
})

.factory('logincheck', function($rootScope, $state){
     
     var hasLogin = false;

     return {
        go: function(){
			if(!hasLogin){
				$state.go("app.login");
			}else{
				$state.go("app.profile");
			}
        },
        enter : function(){
			hasLogin = true;			
        },
		leave : function(){
			hasLogin = false;			
        }		
     }

})

.controller('selecttypeCtrl', function($scope, $state, logincheck) {
	
})


.controller('selectpetsCtrl', function($scope, $state, $stateParams, logincheck) {
	$scope.allpet={
		"allpet": {
			"dog": [{
					"name": "โกโก้",
					"type": "สุนัข",
					"age": 3,
					"gender": "Male",
					"description": "สีน้ำตาล ฟันหลอ 1 ซี่ ชอบกินเนื้อย่าง",
					"breed": "บางแก้วผสมไทยหลังอาน",
					"tag": ["ขี้เล่น", "ขี้อ้อน"],
					"imgurl":["img/cocoa.jpg","img/cocoa2.jpg"]
				},
				{
					"name": "ลัคกี้",
					"type": "สุนัข",
					"age": 2,
					"gender": "Female",
					"description": "ขนสีขาว ไม่ชอบที่มืด",
					"breed": "พุดเดิ้ล",
					"tag": ["ขี้เล่น", "ขี้อ้อน"]
				},
				{
					"name": "ชิโร่",
					"type": "สุนัข",
					"age": 5,
					"gender": "Male",
					"description": "สีเนื้อ ขนมันเงา ชอบเล่นจานร่อน",
					"breed": "อกิตะ",
					"tag": ["ขี้เล่น"]
				},
				{
					"name": "โครอน",
					"type": "สุนัข",
					"age": 4,
					"gender": "Female",
					"description": "สีน้ำตาล ชอบวิ่งเล่น",
					"breed": "คอลลี่",
					"tag": ["ขี้เล่น", "ขี้อ้อน"]
				},
				{
					"name": "เฮงเฮง",
					"type": "สุนัข",
					"age": 12,
					"gender": "Male",
					"description": "สีขาวดำ",
					"breed": "-",
					"tag": ["ขี้เซา"]
				},
				{
					"name": "ลาเต้",
					"type": "สุนัข",
					"age": 6,
					"gender": "Male",
					"description": "สีน้ำตาลขาว รักเด็ก ดื้อมาก",
					"breed": "โกลเด้น",
					"tag": [
						"ขี้เล่น"
					]
				},
				{
					"name": "ตาล",
					"type": "สุนัข",
					"age": 2,
					"gender": "Male",
					"description": "กลัวคนแปลกหน้า ชอบกินข้าวคลุกกระดูกไก่สับ",
					"breed": "ชาเป่ย",
					"tag": [
						"ขี้กลัว",
						"ขี้อ้อน"
					]
				},
				{
					"name": "บูบู้",
					"type": "สุนัข",
					"age": 3,
					"gender": "Male",
					"description": "สีดำทั้งตัว ",
					"breed": "พิตบู",
					"tag": [
						"ขี้เล่น",
						"ก้าวร้าว"
					]
				},
				{
					"name": "ลินดา",
					"type": "สุนัข",
					"age": 4,
					"gender": "Female",
					"description": "รักเด็กผู้หญิง ชอบเล่นลูกบอล ชอบปีนป่าย กินอาหารเม็ด",
					"breed": "คอลลี่",
					"tag": [
						"ขี้เล่น",
						"ขี้อ้อน"
					]
				},
				{
					"name": "ปุ๊โกะ",
					"type": "สุนัข",
					"age": 2,
					"gender": "Female",
					"description": "สีขาว ชอบอาบน้ำ ว่ายน้ำ ชอบกินข้าวคลกน้ำพริก",
					"breed": "เครนเทอร์เรีย",
					"tag": [
						"ขี้เล่น",
						"ขี้อ้อน",
						"ขี้เซา"
					]
				}
	
			],
			"cat": [{
					"name": "สิริ",
					"type": "แมว",
					"age": 2,
					"gender": "Female",
					"description": "สามสี ส้ม ขาว ดำ ชอบกินปลาทูทอด ขี้อ้อน กลัวหมา",
					"breed": "สามสี",
					"tag": ["ขี้เล่น", "ขี้อ้อน"]
				},
				{
					"name": "แฮปปี้",
					"type": "แมว",
					"age": 3,
					"gender": "Male",
					"description": "สีฟ้า ชอบนอน",
					"breed": "บริติชขนสั้น",
					"tag": ["ขี้เซา"]
				},
				{
					"name": "มาจัง",
					"type": "แมว",
					"age": 1,
					"gender": "Female",
					"description": "สีขาวอมส้ม ชอบนั่งหน้าโทรทัศน์",
					"breed": "มันช์กิ้น",
					"tag": ["ขี้เล่น", "ขี้อ้อน"]
				},
				{
					"name": "จี้จัง",
					"type": "แมว",
					"age": 1,
					"gender": "Female",
					"description": "สีขาว ชอบเล่นของเล่น",
					"breed": "สิงหะปุระ",
					"tag": ["ขี้อ้อน"]
				},
				{
					"name": "โลจัง",
					"type": "แมว",
					"age": 1,
					"gender": "Female",
					"description": "สีฟ้าเจือเงิน ชอบเล่นของเล่น",
					"breed": "รัสเซียนบลู",
					"tag": ["ขี้อ้อน"]
				}
			],
			"bird": [{
					"name": "คิริ",
					"type": "นก",
					"age": 3,
					"gender": "Male",
					"description": "สีเหลือง ขอบร้องเพลง",
					"breed": "คีรีบูน",
					"tag": ["ขี้เล่น"]
				},
				{
					"name": "นิจิ",
					"type": "นก",
					"age": 4,
					"gender": "Male",
					"description": "ชอบเกาะตามขอบตู้หรือเตียง",
					"breed": "เยลโล่ไซต์คอนนัว",
					"tag": ["ขี้กลัว"]
				},
				{
					"name": "ซันนี่",
					"type": "นก",
					"age": 2,
					"gender": "Female",
					"description": "ชอบบินมาเกาะ",
					"breed": "ซันคอนัว",
					"tag": ["ขี้้อ้อน"]
				},
				{
					"name": "ยูกิ",
					"type": "นก",
					"age": 3,
					"gender": "Female",
					"description": "ชอบเล่นไล่จับ",
					"breed": "นกกระตั้ว",
					"tag": ["ขี้เล่น"]
				},
				{
					"name": "กิ๊ก",
					"type": "นก",
					"age": 2,
					"gender": "Female",
					"description": "ชอบร้องเพลง ชอบพูดตามคน",
					"breed": "แก้ว",
					"tag": [
						"ขี้เล่น"
					]
				}
			],
			"mouse": [{
				"name": "พายุ",
				"type": "แฮมสเตอร์",
				"age": 1,
				"gender": "Male",
				"description": "ชอบวิ่ง ชอบกินธัญพืช ไม่ชอบอยู่เฉยๆ",
				"breed": "-",
				"tag": [
					"ขี้เล่น"
				]
			}],
			"rabbit": [{
					"name": "ทิปปี้",
					"type": "กระต่าย",
					"age": 4,
					"gender": "Female",
					"description": "สีขาว ขนนุ่มพู",
					"breed": "แองโกล่า",
					"tag": ["ขี้เล่น", "ขี้อ้อน"]
				},
				{
					"name": "อันโกะ",
					"type": "กระต่าย",
					"age": 3,
					"gender": "Male",
					"description": "สีดำ ชอบนั่งอยู่นิ่งๆ",
					"breed": "แองโกล่า",
					"tag": ["ขี้เซา"]
				},
				{
					"name": "ชิรอน",
					"type": "กระต่าย",
					"age": 3,
					"gender": "Female",
					"description": "สีขาว ชอบเล่นในกล่อง",
					"breed": "อิงลิซ ล็อป",
					"tag": ["ขี้เล่น"]
				},
				{
					"name": "โรโกะ",
					"type": "กระต่าย",
					"age": 2,
					"gender": "Female",
					"description": "สีขาว ตื่นคนแปลกหน้า",
					"breed": "เท็ดดี้แบร์ ",
					"tag": ["ขี้กลัว"]
				},
				{
					"name": "เจอรี่",
					"type": "กระต่าย",
					"age": 1,
					"gender": "Male",
					"description": "สีน้ำตาาล ตื่นเสียงสุนัข",
					"breed": "เจอร์รี่วู๊ดดี้ ",
					"tag": ["ขี้กลัว", "ขี้อ้อน"]
				},
				{
					"name": "วินดี้",
					"type": "กระต่าย",
					"age": 2,
					"gender": "Female",
					"description": "สีขาว ชอบกินผักบุ้ง เป็นมิตร",
					"breed": "ฮอลแลนด์ลอป",
					"tag": [
						"ขี้เซา"
					]
				},
				{
					"name": "มิน่า",
					"type": "กระต่าย",
					"age": 3,
					"gender": "Female",
					"description": "สีขาว ชอบวิ่ง ซน",
					"breed": "เท็ดดี้แบร์",
					"tag": [
						"ขี้เล่น"
					]
				}
			],
			"other": [{
					"name": "มีมี่",
					"type": "เม่นแคระ",
					"age": 2,
					"gender": "Male",
					"description": "ขี้หนาว กลัวน้ำ กินอาหารแมวMeo ไม่ชอบเล่นด้วย จะขู่",
					"breed": "เฮดจ์ฮอก",
					"tag": [
						"ขี้กลัว",
						"ขี้เซา"
					]
				},
				{
					"name": "โซจิโร่",
					"type": "เม่น",
					"age": 2,
					"gender": "Male",
					"description": "ชอบกินแอปเปิล",
					"breed": "-",
					"tag": ["ขี้เซา", "ขี้อ้อน"]
				}
			]
		}
	};
	$scope.type = $stateParams.type;
	$scope.pet = $scope.allpet["allpet"][$scope.type]
})


