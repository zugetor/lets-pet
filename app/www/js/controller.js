angular.module('starter.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
	})
	.controller('findFormCtrl', function ($scope, $rootScope, $timeout) {
		$scope.slideIndex = 1;

		$scope.showDivs = function (n) {
			var i;
			var x = document.getElementsByClassName("mySlides");
			if (n > x.length) { $scope.slideIndex = 1 }
			if (n < 1) { $scope.slideIndex = x.length }
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			x[$scope.slideIndex - 1].style.display = "block";
		};
		$scope.plusDivs = function (n) {
			$scope.showDivs($scope.slideIndex += n);
		}
		$scope.show = function () {
			document.getElementById("ctrlbutton").classList.remove("hide");
			$scope.plusDivs(0);
		};
	})

	.controller('HomeCtrl', function ($scope, $rootScope, $interval, $ionicPlatform, logincheck) {
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

		$scope.tipOf = "ช็อตโกแลต เป็นอาหารต้องห้ามของเหล่าสัตว์เลี้ยง";
		$scope.randomtip = function () {
			$scope.tipOf = tip[Math.floor(Math.random() * tip.length)];
		}
		$interval(function () { $scope.randomtip(); }, 10000);
		$scope.go = function () {
			logincheck.go();
		}
	})

	.controller('LoginCtrl', function ($scope, $state, logincheck) {
		$scope.login = function () {
			logincheck.enter();
			$state.go("app.home");
		};
	})


	.controller('ProfileCtrl', function ($scope, $state, logincheck) {
		$scope.logout = function () {
			logincheck.leave();
		};
	})

	.factory('logincheck', function ($rootScope, $state) {

		var hasLogin = false;

		return {
			go: function () {
				if (!hasLogin) {
					$state.go("app.login");
				} else {
					$state.go("app.profile");
				}
			},
			enter: function () {
				hasLogin = true;
			},
			leave: function () {
				hasLogin = false;
			}
		}
	})

	.controller('selecttypeCtrl', function ($scope, $state, logincheck) {
	})

	.controller('selectpetsCtrl', function ($scope, $state, $stateParams, logincheck) {
		$scope.allpet = {
			"allpet": {
				"dog": [{
					"name": "โกโก้", "type": "สุนัข", "age": 3, "gender": "Male", "description": "สีน้ำตาล ฟันหลอ 1 ซี่ ชอบกินเนื้อย่าง",
					"breed": "บางแก้วผสมไทยหลังอาน", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/cocoa.jpg", "img/cocoa2.jpg"], "owner": "มินากิ", "tel": "08235648"
				}, {
					"name": "ลัคกี้", "type": "สุนัข", "age": 2, "gender": "Female", "description": "ขนสีขาว ไม่ชอบที่มืด",
					"breed": "พุดเดิ้ล", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/Lucky.jpg"], "owner": "โมโมกะ", "tel": "084532657"
				}, {
					"name": "ชิโร่", "type": "สุนัข", "age": 5, "gender": "Male", "description": "สีเนื้อ ขนมันเงา ชอบเล่นจานร่อน",
					"breed": "อกิตะ", "tag": ["ขี้เล่น"], "imgurl": ["img/shiro.jpg"], "owner": "ฟุยูกิ", "tel": "087531264"
				}, {
					"name": "โครอน", "type": "สุนัข", "age": 4, "gender": "Female",
					"description": "สีน้ำตาล ชอบวิ่งเล่น", "breed": "คอลลี่", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/coron.jpg"], "owner": "ทามามะ", "tel": "0812478965"
				}, {
					"name": "เฮงเฮง", "type": "สุนัข", "age": 12, "gender": "Male", "description": "สีขาวดำ",
					"breed": "-", "tag": ["ขี้เซา"], "imgurl": ["img/hengheng.jpg"], "owner": "เรนะ", "tel": "082235697"
				}, {
					"name": "ลาเต้", "type": "สุนัข", "age": 6, "gender": "Male",
					"description": "สีน้ำตาลขาว รักเด็ก ดื้อมาก", "breed": "โกลเด้น", "tag": ["ขี้เล่น"], "imgurl": ["img/ล้าเต้.jpg", "img/ลาเต้2.jpg"], "owner": "สมศรี", "tel": "0812478965"
				}, {
					"name": "ตาล", "type": "สุนัข", "age": 2, "gender": "Male", "description": "กลัวคนแปลกหน้า ชอบกินข้าวคลุกกระดูกไก่สับ",
					"breed": "ชาเป่ย", "tag": ["ขี้กลัว", "ขี้อ้อน"], "imgurl": ["img/ตาล.jpg", "img/ตาล2.jpg"], "owner": "มิกิ", "tel": "087654234"
				}, {
					"name": "บูบู้", "type": "สุนัข", "age": 3, "gender": "Male", "description": "สีดำทั้งตัว ",
					"breed": "พิตบู", "tag": ["ขี้เล่น", "ก้าวร้าว"], "imgurl": ["img/บูบู้.jpg", "img/บูบู้2.jpg"], "owner": "มิวะ", "tel": "084125453"
				}, {
					"name": "ลินดา", "type": "สุนัข", "age": 4, "gender": "Female", "description": "รักเด็กผู้หญิง ชอบเล่นลูกบอล ชอบปีนป่าย กินอาหารเม็ด",
					"breed": "คอลลี่", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/ลินดา.jpg", "img/ลินดา2.jpg"], "owner": "ลูลู่", "tel": "085425879"
				}, {
					"name": "ปุ๊โกะ", "type": "สุนัข", "age": 2, "gender": "Female", "description": "สีขาว ชอบอาบน้ำ ว่ายน้ำ ชอบกินข้าวคลกน้ำพริก",
					"breed": "เครนเทอร์เรีย", "tag": ["ขี้เล่น", "ขี้อ้อน", "ขี้เซา"], "imgurl": ["img/ปุ๊โกะ.jpg", "img/ปุ๊โกะ.jpg"], "owner": "พีน่า", "tel": "082354587"
				}],
				"cat": [{
					"name": "สิริ", "type": "แมว", "age": 2, "gender": "Female", "description": "สามสี ส้ม ขาว ดำ ชอบกินปลาทูทอด ขี้อ้อน กลัวหมา",
					"breed": "สามสี", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/siri.jpg"], "owner": "คาคาชิ", "tel": "084251234"
				}, {
					"name": "แฮปปี้", "type": "แมว", "age": 3, "gender": "Male", "description": "สีฟ้า ชอบนอน",
					"breed": "บริติชขนสั้น", "tag": ["ขี้เซา"], "imgurl": ["img/happy.jpg"], "owner": "ซากุระ", "tel": "084235125"
				}, {
					"name": "มาจัง", "type": "แมว", "age": 1, "gender": "Female", "description": "สีขาวอมส้ม ชอบนั่งหน้าโทรทัศน์",
					"breed": "มันช์กิ้น", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/maa.jpg"], "owner": "มิวกี้", "tel": "084523695"
				}, {
					"name": "จี้จัง", "type": "แมว", "age": 1, "gender": "Female", "description": "สีขาว ชอบเล่นของเล่น",
					"breed": "สิงหะปุระ", "tag": ["ขี้อ้อน"], "imgurl": ["img/chi.jpg"], "owner": "โรส", "tel": "084531258"
				}, {
					"name": "โลจัง", "type": "แมว", "age": 1, "gender": "Female", "description": "สีฟ้าเจือเงิน ชอบเล่นของเล่น",
					"breed": "รัสเซียนบลู", "tag": ["ขี้อ้อน"], "imgurl": ["img/ro.jpg", "img/ro2.jpg"], "owner": "ฟีโอน่า", "tel": "084532667"
				}],
				"bird": [{
					"name": "คิริ", "type": "นก", "age": 3, "gender": "Male", "description": "สีเหลือง ขอบร้องเพลง",
					"breed": "คีรีบูน", "tag": ["ขี้เล่น"], "imgurl": ["img/kiri.jpg"], "owner": "ลูลิ", "tel": "081297546"
				}, {
					"name": "นิจิ", "type": "นก", "age": 4, "gender": "Male", "description": "ชอบเกาะตามขอบตู้หรือเตียง",
					"breed": "เยลโล่ไซต์คอนนัว", "tag": ["ขี้กลัว"], "imgurl": ["img/niji.jpg"], "owner": "ราฟ", "tel": "087854699"
				}, {
					"name": "ซันนี่", "type": "นก", "age": 2, "gender": "Female", "description": "ชอบบินมาเกาะ",
					"breed": "ซันคอนัว", "tag": ["ขี้้อ้อน"], "imgurl": ["img/sunny.jpg"], "owner": "มุกกี้", "tel": "082213569"
				}, {
					"name": "ยูกิ", "type": "นก", "age": 3, "gender": "Female", "description": "ชอบเล่นไล่จับ",
					"breed": "นกกระตั้ว", "tag": ["ขี้เล่น"], "imgurl": ["img/yuki.jpg"], "owner": "โทรุ", "tel": "084538741"
				}, {
					"name": "กิ๊ก", "type": "นก", "age": 2, "gender": "Female", "description": "ชอบร้องเพลง ชอบพูดตามคน",
					"breed": "แก้ว", "tag": ["ขี้เล่น"], "imgurl": ["img/กิ๊ก.jpg", "img/กิ๊ก2.jpg"], "owner": "เฟร", "tel": "084125378"
				}],
				"mouse": [{
					"name": "พายุ", "type": "แฮมสเตอร์", "age": 1, "gender": "Male", "description": "ชอบวิ่ง ชอบกินธัญพืช ไม่ชอบอยู่เฉยๆ",
					"breed": "-", "tag": ["ขี้เล่น"], "imgurl": ["img/พายุ.jpg", "img/พายุ2.jpg"], "owner": "เลโอ", "tel": "082254369"
				}],
				"rabbit": [{
					"name": "ทิปปี้", "type": "กระต่าย", "age": 4, "gender": "Female", "description": "สีขาว ขนนุ่มพู",
					"breed": "แองโกล่า", "tag": ["ขี้เล่น", "ขี้อ้อน"], "imgurl": ["img/tippy.jpg"], "owner": "แตงโม", "tel": "087321554"
				}, {
					"name": "อันโกะ", "type": "กระต่าย", "age": 3, "gender": "Male", "description": "สีดำ ชอบนั่งอยู่นิ่งๆ",
					"breed": "แองโกล่า", "tag": ["ขี้เซา"], "imgurl": ["img/anko.jpg"], "owner": "จูเนีย", "tel": "081124583"
				}, {
					"name": "ชิรอน", "type": "กระต่าย", "age": 3, "gender": "Female", "description": "สีขาว ชอบเล่นในกล่อง",
					"breed": "อิงลิซ ล็อป", "tag": ["ขี้เล่น"], "imgurl": ["img/shiron.jpg"], "owner": "เกม", "tel": "083526748"
				}, {
					"name": "โรโกะ", "type": "กระต่าย", "age": 2, "gender": "Female", "description": "สีขาว ตื่นคนแปลกหน้า",
					"breed": "เท็ดดี้แบร์ ", "tag": ["ขี้กลัว"], "imgurl": ["img/roko.jpg"], "owner": "แป้ง", "tel": "087758412"
				}, {
					"name": "เจอรี่", "type": "กระต่าย", "age": 1, "gender": "Male", "description": "สีน้ำตาาล ตื่นเสียงสุนัข",
					"breed": "เจอร์รี่วู๊ดดี้ ", "tag": ["ขี้กลัว", "ขี้อ้อน"], "imgurl": ["img/jerry.jpg"], "owner": "พลอย", "tel": "084258112"
				}, {
					"name": "วินดี้", "type": "กระต่าย", "age": 2, "gender": "Female", "description": "สีขาว ชอบกินผักบุ้ง เป็นมิตร",
					"breed": "ฮอลแลนด์ลอป", "tag": ["ขี้เซา"], "imgurl": ["img/วินดี้.jpg"], "owner": "อ๊อฟ", "tel": "085423966"
				}, {
					"name": "เท็ดดี้", "type": "กระต่าย", "age": 3, "gender": "Male", "description": "สีขาว ชอบวิ่ง ซน",
					"breed": "เท็ดดี้แบร์", "tag": ["ขี้เล่น"], "imgurl": ["img/เท็ดดี้.jpg", "img/เท็ดดี้2.jpg", "img/เท็ดดี้3.jpg"], "owner": "ซัน", "tel": "088857439"
				}],
				"other": [{
					"name": "มีมี่", "type": "เม่นแคระ", "age": 2, "gender": "Male", "description": "ขี้หนาว กลัวน้ำ กินอาหารแมวMeo ไม่ชอบเล่นด้วย จะขู่",
					"breed": "เฮดจ์ฮอก", "tag": ["ขี้กลัว", "ขี้เซา"], "imgurl": ["img/มีมี่.jpg", "img/มีมี่2.jpg"], "owner": "ปราง", "tel": "085744861"
				}, {
					"name": "โซจิโร่", "type": "เม่น", "age": 2, "gender": "Male", "description": "ชอบกินแอปเปิล",
					"breed": "-", "tag": ["ขี้เซา", "ขี้อ้อน"], "imgurl": ["img/sojiro.jpg", "img/sojiro2.jpg"], "owner": "สมศรี", "tel": "0812478965"
				}]
			}
		};
		$scope.type = $stateParams.type;
		$scope.pet = $scope.allpet["allpet"][$scope.type];
	})

	.controller('DonateCtrl', function ($scope, $state, $ionicPlatform, $ionicPopup) {
		$scope.openform = function () {
			var confirmPopup = $ionicPopup.confirm({
				title: 'เลือกสถานที่บริจาค',
				template: 'คุณจะบริจาคให้ที่ไหน?',
				cancelText: 'สถานพักพิงสัตว์นีโม่',
				cancelType: 'button-positive',
				okText: "สถานพักพิงสัตว์นาเกลือ"
			});
			$scope.price = document.getElementById("donateVal").value;
			confirmPopup.then(function (res) {
				if (res) {
					var alertPopup = $ionicPopup.alert({
						title: 'PromptPay QR Code',
						template: '<div class="text-center"><img src="https://promptpay.io/0909108479/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
					});
				} else {
					var alertPopup2 = $ionicPopup.alert({
						title: 'PromptPay QR Code',
						template: '<div class="text-center"><img src="https://promptpay.io/0851412356/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
					});
				}
			});
		};
	})

	.controller('knowledgeCtrl', function ($scope, $state, $stateParams, logincheck) {
		$scope.blog = {
			"posts": [
				{
					"topic": "ความอ้วนของสุนัข เรื่องน่ารักที่มาพร้อมโรคร้าย!!",
					"detail": "1. พันธุกรรม-บางสายพันธุ์มีความเสี่ยงเป็นโรคอ้วนอยู่แล้ว เช่น ดัชชุน บูลด็อก เซนต์เบอร์นาร์ด เชาเชา ปั๊ก <br>2. ช่วงวัย-เมื่อน้องหมาอายุมากกว่า 5 ปี ก็มีโอกาสเสี่ยงเป็นโรคอ้วนมากถึง 30 - 40% เพราะอัตราการเผาพลาญอาหารทำงานได้น้อยลง <br>3. เพศ-เพศเมียมีแนวโน้มที่จะมีโอกาสเป็นโรคอ้วนได้ง่ายกว่าเพศผู้ เพราะฮอร์โมนเพศที่แตกต่างกัน รวมทั้งรูปแบบการใช้ชีวิต และกิจกรรมที่อาจต่างกันไปในแต่ละเพศด้วย <br>4. การทำหมัน <br>5. โภชนาการ <br>6. ขาดการออกกำลังกาย <br>7. โรคบางชนิด เช่น Cushing's Syndrome Hypothyroidism <br>8. ยาบางชนิด  เช่น ยาระงับอาการชักบางตัว และมียากลุ่มสเตียรอยด์จะกระตุ้นให้เกิดการสะสมไขมันและน้ำตาลบริเวณหน้าท้อง",
					"url": "https://www.osdco.net/upload/iblock/ae1/preview.jpg"
				},
				{
					"topic": "5 อันดับอาการยอดฮิต ที่จะตามมาเมื่อแมวของคุณเป็นโรคอ้วน...",
					"detail": "1. โรคเบาหวาน เพราะเวลาที่น้องแมวนั้นอ้วนขึ้น ความไวรับของอินซูลินนั้นจะลดลง และการตรวจจับน้ำตาลในเลือดก็จะเปลี่ยนไปด้วย<br>2. โรคทางระบบปัสสาวะ<br>โรคอ้วนจะเป็นปัจจัยเสี่ยงในการเกิดความผิดปกติที่ระบบปัสสาวะส่วนท้ายโดยเฉพาะการเกิดนิ่ว และยังทำให้น้องแมวน้ำหนักลดลงอีกด้วย<br>3. โรคกระดูกและข้ออักเสบ<br>วนที่อยู่ระหว่างกระดูกสันหลัง คอยรองรับแรงกระแทกของกระดูกสันหลังเวลาที่ร่างกายเคลื่อนไหว หากเจ้าหมอนรองกระดูกนี้เกิดการเคลื่อนออกมาจากตำแหน่งปกติ จะทำให้น้องแมวเจ็บปวด และเป็นอัมพาตได้<br>4. โรคทางระบบต่อมไร้ท่อ<br>เกิดจากความสัมพันธ์ของความอ้วนกับการเพิ่มขึ้นของสารสื่ออักเสบ ทำให้การหลั่งฮอร์โมนผิดไปจากเดิม<br>5. คุณภาพชีวิตแย่ลง<br>หากน้องแมวของเรานั้นอ้วนอุ้ยอ้าย ก็จะไม่มีความคล่องตัว ไม่ปราดเปรียวและซุกซนเหมือนนิสัยปกติ",
					"url": "https://www.osdco.net/upload/iblock/618/cat-dog-cover.jpg"
				},
				{
					"topic": "6 สัญญาณที่บ่งบอกว่าน้องหมาออกกำลังกายไม่เพียงพอ",
					"detail": "1. น้ำหนักตัวน้องหมาเพิ่มมากขึ้น<br>2. พฤติกรรมชอบทำลายข้าวของ<br>3. มีพฤติกรรมสมาธิสั้น, ตื่นเต้นผิดปกติ (Hyperactivity)<br>4. น้องหมาเริ่มเก็บเนื้อเก็บตัว<br>5. น้องหมาแสดงอาการเจ็บขา<br>6. น้องหมาชอบเห่าและหอน",
					"url": "https://www.osdco.net/upload/gun/6%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%931200x630.png"
				},
				{
					"topic": "ข้อควรระวัง อาหารต้องห้ามสำหรับเจ้าเหมียว ก่อนจะรู้เท่าไม่ถึงการณ์",
					"detail": "ปลาดิบ, เนื้อดิบ เพราะมีแบคทีเรียที่ชื่อว่า ‘salmonella’ ที่จะทำให้น้อง ๆ เกิดอาการอาเจียนและท้องเสียได้ค่ะ<br>ไข่ดิบ อาจจะทำให้เค้าติดเชื้อ Salmonella Sp. ซึ่งทำให้อาเจียน ท้องเสีย และเกิดภาวะขาดน้ำได้<br>กระดูกต้ม อาจจะทำให้เจ้าเหมียวของเราฟันหัก และที่ร้ายแรงยิ่งกว่านั้นคือ พวกเศษกระดูกจะไปติดหรือแทงระบบทางเดินอาหาร<br>ไขมันจากเนื้อ มันจะทำให้เจ้าเหมียวคลื่นไส้และท้องเสียได้<br>นม  เพราะกระเพาะของเจ้าเหมียวนั้น ไม่เหมาะกับการย่อยนมเท่าไหร่นัก แต่ถ้าจะให้น้อยๆ นานๆ ที ก็พอได้<br>ชา กาแฟ โซดา จะทำให้เค้านอนไม่หลับ ใจสั่น หายใจถี่ และกล้ามเนื้อกระตุก<br>แมคคาเดเมีย อาจจะทำให้เค้าสำลัก อาเจียน ท้องเสีย หรือถึงขั้นเป็นอัมพาตได้<br>แป้งขนมปังดิบ เพราะมันจะไปหมักและก็ขยายอยู่ในกระเพาะของเค้า ทำให้เจ้าเหมียวปวดท้องได้<br>แอลกอฮอล์ ทำให้เป็นอันตรายถึงชีวิต  วิงเวียน คลื่นไส้ ระบบทางเดินหายใจมีปัญหา หรืออาจถึงขั้นเสียสติ<br>ช็อคโกแลต มีส่วนประกอบที่ชื่อว่า “Theobromine” ที่ก่อให้เกิดอันตราย ทำให้ หัวใจเต้นไว ความดันเลือดสูง ใจสั่น และชัก",
					"url": "https://www.osdco.net/images/reviews/cat-treats-avoid/cat-treats-avoid-01.jpg"
				},
				{
					"topic": "ของใช้ที่จำเป็นสำหรับน้องหมาสำหรับเจ้าของมือใหม่",
					"detail": "ที่นอน (Bedding) <br>ที่นอนที่ดีควรจะมีความทนทานสูง ที่นอนของสุนัขต้องมีขนาดใหญ่เพียงพอที่เค้าจะสามารถยืดตัว หมุนตัว บิดขี้เกียจยามเช้าได้<br>ชามอาหารและน้ำ (Food and water bowl)<br>ต้องปลอดภัย ไม่มีสารเคมีตกค้างที่เป็นอันตรายแก่น้องหมาของเรา ชามประเภทสแตนเลสและเซรามิคจะทำความสะอาดง่าย ทนทานต่อการกัดแทะ ชามพลาสติกควรเลือกที่ได้มาตรฐาน<br>กรง (Crate)<br>ต้องมีขนาดใหญ่มากพอที่จะให้สุนัขอยู่ได้อย่างไม่อึดอัด แต่ก็ต้องไม่ใหญ่จนเกินไปที่สุนัขจะสามารถขับถ่ายในกรงได้<br>ปลอกคอและสายจูง (Collar and leashes)<br>-ปลอกคอสุนัข (Collar)<br>ใช้แบบผ้าธรรมดาไปก่อนจนถึงอายุประมาณ 6-8 เดือน ต้องสามารถสอดนิ้วเข้าไประหว่างคอสุนัขและปลอกคอได้ 1-2 นิ้ว<br>-สายรัดอก (Harnesses)<br>แนะนำให้มีโดยเฉพาะอย่างยิ่งในลูกหมา หรือน้องหมาพันธุ์เล็กถึงกลาง เนื่องจากถ้าเราติดสายจูงกับปลอกคอ เวลาจูงอาจจะดึงบริเวณคอ<br>-สายจูง (Leashes)<br>งเลือกซื้อ สำหรับลูกหมาแนะนำความยาวประมาณ 1.2-1.8 เมตร ถ้าใช้ในการฝึกให้น้องหมาวิ่งกลับมาหาเราควรเลือกความยาวประมาณ 6-12 เมตร",
					"url": "https://www.osdco.net/images/communities/dog-essential-equipment/cover-dog-essential-equipment.jpg"
				},
				{
					"topic": "มา Check List พัฒนาการน้องหมา พร้อมวิธีการฝึกเบื้องต้นกันเถอะ",
					"detail": "1. “วัยเบบี๋”<br>แรกเกิด ในระยะนี้น้องเค้าจะยังมองไม่เห็น ไม่ได้ยิน ดมกลิ่นได้ก็ไม่ดีนัก และก็ยังเดินไม่ได้อีกด้วย ระยะนี้น้องหมาจะหมดเวลาไปกับการกินและการนอนเสียเป็นส่วนใหญ่<br>2. “วัยเปลี่ยนผ่าน” (ช่วง 3 สัปดาห์แรก)<br>ในระยะนี้จมูกและประสาทการรับรู้กลิ่นจะเริ่มทำงานอย่างเต็มที่ แต่ส่วนการมองเห็นและการได้ยินเสียงนั้น ยังไม่ค่อยดีเท่าไรนัก<br>3. “วัยแห่งการเรียนรู้” (ช่วง 4 - 7 สัปดาห์)<br>ช่วงเวลานี้น้องหมาจึงมีความสามารถในการเรียนรู้ได้อย่างดีเยี่ยม สอนง่าย เรียนรู้ไว ซึมซับเร็ว จะเรียกว่า เป็นช่วงเวลาทองในการฝึกเลยก็ได้<br>4. “วัยเรียนรู้สังคม” (ช่วง 8 - 12 สัปดาห์)<br>ช่วงนี้แหละที่มีความอยากรู้อยากเห็นในสิ่งรอบตัวสูงมาก จะเหมาะมากถ้าจะนำน้องหมามาเลี้ยงในระยะนี้ เพราะเป็นช่วงที่เขาชอบเข้าสังคม สร้างความสัมพันธ์กับคนอื่น ๆ ได้ง่าย<br>5. “วัยว้าวุ่น” (ช่วงอายุ 12 สัปดาห์ ถึงเข้าสู่วัยเจริญพันธุ์อายุประมาณ 6 เดือน)<br>ช่วงนี้เราควรสอน หรือฝึกคำสั่งง่าย ๆ ได้ เช่น มา (Ca’mon Ca’mon), นั่ง (Sit down), คอย (รออออออ), นอน (เคล๊งงงง)",
					"url": "https://www.osdco.net/upload/iblock/489/preview.jpg"
				}]
		};
		$scope.posts = $scope.blog["posts"]
	})

	.controller('DonateCtrl', function ($scope, $state, $ionicPlatform, $ionicPopup) {
		$scope.place = "";
		$scope.openform = function () {
			$scope.price = document.getElementById("donateVal").value;
			$ionicPopup.show({
				template: '<ion-list><ion-radio id="choose">สถานพักพิงสัตว์นีโม่</ion-radio><ion-radio>สถานพักพิงสัตว์นาเกลือ</ion-radio></ion-list>',
				title: 'เลือกสถานที่สำหรับบริจาค',
				buttons: [{
					text: 'Cancel',
				}, {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function (e) {
						if (document.getElementById("choose")["childNodes"][0]["checked"]) {
							var alertPopup = $ionicPopup.alert({
								title: 'PromptPay QR Code',
								template: '<div class="text-center"><img src="https://promptpay.io/0909108479/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
							});
						} else {
							var alertPopup2 = $ionicPopup.alert({
								title: 'PromptPay QR Code',
								template: '<div class="text-center"><img src="https://promptpay.io/0851412356/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
							});
						}
					}
				}]
			});
		};
	})

	.controller('DonateCtrl', function ($scope, $state, $ionicPlatform, $ionicPopup) {
		$scope.place = "";
		$scope.openform = function () {
			$scope.price = document.getElementById("donateVal").value;
			$ionicPopup.show({
				template: '<ion-list><ion-radio id="choose">สถานพักพิงสัตว์นีโม่</ion-radio><ion-radio>สถานพักพิงสัตว์นาเกลือ</ion-radio></ion-list>',
				title: 'เลือกสถานที่สำหรับบริจาค',
				buttons: [{
					text: 'Cancel',
				}, {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function (e) {
						if (document.getElementById("choose")["childNodes"][0]["checked"]) {
							var alertPopup = $ionicPopup.alert({
								title: 'PromptPay QR Code',
								template: '<div class="text-center"><img src="https://promptpay.io/0909108479/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
							});
						} else {
							var alertPopup2 = $ionicPopup.alert({
								title: 'PromptPay QR Code',
								template: '<div class="text-center"><img src="https://promptpay.io/0851412356/' + $scope.price + '" class="img-auto"></img></div><p>สแกนหรือถ่ายภาพหน้าจอได้ทันที</p>'
							});
						}
					}
				}]
			});
		};
	})
