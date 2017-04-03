import React from 'react';
import ScrollSpyItem from './ScrollSpyItem';

const SideBarScrollSpy = (props) =>{		
		
		const currentYPosition = () => {
			// Firefox, Chrome, Opera, Safari
			if (self.pageYOffset) return self.pageYOffset;
			// Internet Explorer 6 - standards mode
			if (document.documentElement && document.documentElement.scrollTop)
				return document.documentElement.scrollTop;
			// Internet Explorer 6, 7 and 8
			if (document.body.scrollTop) return document.body.scrollTop;
			return 0;
		}

		const elementYPosition = (element_id) => {
			var elm = document.getElementById(element_id);
			var y = elm.offsetTop -58; //for adjustment on scroll
			var node = elm;
			while (node.offsetParent && node.offsetParent !== document.body) {
				node = node.offsetParent;
				y += node.offsetTop;
			} return y;
		}		
		
		const pageScroll = (leapY, timer_speed) =>{
			//window.scrollTo(0, leapY);
			setTimeout(function(){
				window.scrollTo(0, leapY);
			}, timer_speed);
		}		
	
		const smoothScroll = (element_id) => {
			var startY = currentYPosition();
			var stopY = elementYPosition(element_id);
			var distance = stopY > startY ? stopY - startY : startY - stopY;
			if (distance < 100) {
				scrollTo(0, stopY); return;
			}
			var speed = Math.round(distance / 100);
			if (speed >= 500) speed = 500;
			var step = Math.round(distance / 25);
			var leapY = stopY > startY ? startY + step : startY - step;
			var timer = 0, i;
			if (stopY > startY) {
				for (i=startY; i<stopY; i+=step ) {
					pageScroll(leapY, (timer * speed));
					leapY += step; if (leapY > stopY) leapY = stopY; timer++;
				} return;
			}
			for (i=startY; i>stopY; i-=step ) {
				pageScroll(leapY, (timer * speed));
				leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
			}
		}
		
		const onClickScroll = (e) =>{

			e.preventDefault();
			smoothScroll(e.target.getAttribute("data-id"));
			
			return false;
		}

		return (
			<div id="affix-sidebar">
			 <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Aufgaben</h3>
                </div>
                <div className="box-body">                  
                  <div id="scrollspy-menu">
                    <ul className="nav nav-scrollspy-menu nav-stacked">

                    	<ScrollSpyItem id="taskbox-1" title="One" prefix="1"
                    		onClickScroll={onClickScroll}/>
                    	<ScrollSpyItem id="taskbox-2" title="Two" prefix="2"
                    		onClickScroll={onClickScroll}/>
                    	<ScrollSpyItem id="taskbox-3" title="Three" prefix="3"
                    		onClickScroll={onClickScroll}/>
                    	<ScrollSpyItem id="taskbox-4" title="Four" prefix="4"
                    		onClickScroll={onClickScroll}/>
                    
                    </ul>
                  </div>
                </div>
              </div> 
            </div> 
		)
}
export default SideBarScrollSpy;