var Twitter = (function($){
	var public = {},
	appManager;
	
	$(function(){
		$('#go').click(function(e){
			var hashtag = $('#search').val();
			if(hashtag.length < 2){return;}
			public.start(hashtag);
		});

		try{
 			appManager = document.getElementById("oipfAppMan").getOwnerApplication(document);
  			appManager.show();
  			appManager.privateData.keyset.setValue(0x1);
  			appManager.activate();

		}catch(e){
			//console.log('non hbbtv')
		}

		TweenLite.to('#redbutton',0.5,{
			bottom:0,
			delay:0.5
		});


		$('body').keydown(function(e){
			e.preventDefault();
			var keyCode = e.keyCode; 
			if (keyCode==VK_RED) {	
				public.toggle();
			};

			if(!public.is_visible){
				//return;
			}

			if(keyCode==VK_BLUE){
				/* this will show a build-in
				 * on-screen keyboard. I realized
				 * this *after* building the keypad
				 * and the build-in keyboard is
				 * equally shitty
				 */

				//$('#search').focus();
				Keypad.open($('#search').val());				
			}

			/*
			
			if(keyCode == VK_0)Keypad.input(0);
			if(keyCode == VK_1)Keypad.input(1);
			if(keyCode == VK_2)Keypad.input(2);
			if(keyCode == VK_3)Keypad.input(3);
			if(keyCode == VK_4)Keypad.input(4);
			if(keyCode == VK_5)Keypad.input(5);
			if(keyCode == VK_6)Keypad.input(6);
			if(keyCode == VK_7)Keypad.input(7);
			if(keyCode == VK_8)Keypad.input(8);
			if(keyCode == VK_9)Keypad.input(9);
			*/

			if(keyCode == VK_LEFT){
				Keypad.moveLeft();
			}
			if(keyCode == VK_RIGHT){
				Keypad.moveRight();
			}
			if(keyCode == VK_UP){
				Keypad.moveUp();
			}
			if(keyCode == VK_DOWN){
				Keypad.moveDown();
			}
			if(keyCode == VK_ENTER){
				Keypad.enter();
			}
		});


		TweenLite.to('#redbutton',0.1,{rotation:10,delay:2});
		TweenLite.to('#redbutton',0.1,{rotation:-10,delay:2.1});
		TweenLite.to('#redbutton',0.1,{rotation:10,delay:2.2});
		TweenLite.to('#redbutton',0.1,{rotation:-10,delay:2.3});
		TweenLite.to('#redbutton',0.1,{rotation:10,delay:2.4});
		TweenLite.to('#redbutton',0.1,{rotation:-10,delay:2.5});
		TweenLite.to('#redbutton',0.1,{rotation:0,delay:2.5});

		TweenLite.to('#redbutton',0.5,{bottom:-41,delay:4});


	});

	public.hashtag = null;
	public.timer = null;
	public.last_id = null;
	public.is_visible = false;

	public.toggle = function(){
		$('#tweets').fadeToggle();
		public.is_visible = !public.is_visible;
		public.stop();
		if(!public.is_visible){
			Keypad.hide();
			try{
				appManager.privateData.keyset.setValue(0x1);
			}catch(e){

			}
		}else{
			Keypad.open($('#search').val());
			try{
	  			appManager.privateData.keyset.setValue(0x1+0x2+0x4+0x8+0x10+0x40+0x100+0x200+0x20);
			}catch(e){

			}
		}
	}

	public.stop = function(){
		clearTimeout(public.timer);
		public.timer = null;
		public.last_id = null;
		$('#items').empty();
	}

	public.start = function(hashtag){
		public.hashtag = hashtag;
		public.stop();
		public.fetch();
	}

	public.fetch = function(){
		public.toggleLoading();
		$.ajax({
			url : 'http://hypecla.sh/api/',
			type : 'GET',
			data : {
				search : Twitter.hashtag,
				last_id : Twitter.last_id
			},
			dataType : 'jsonp'
		});
	}

	public.toggleLoading = function(){
		$('#loading').fadeToggle(300);
	}

	

	public.pushTweets = function(data){
		var c = 0;
		public.toggleLoading();
		public.last_id = data.last_id;

		for( var i = data.tweets.length-1; i >= 0 ; i-- ){
			data.tweets[i].created = new Date(data.tweets[i].created).toLocaleString();
			ich.tweet(data.tweets[i])
				.hide()
				.prependTo('#items')
				.delay(c++ * 3000)
				.slideDown(300,public.clipTweets);
		}

		public.timer = setTimeout(Twitter.fetch,data.wait * 1000);
	}

	public.clipTweets = function(){
		$('.tweet:gt(64)').remove();
	}


	return public;
})(jQuery);