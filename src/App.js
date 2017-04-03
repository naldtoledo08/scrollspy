import React from 'react';

import SideBarScrollSpy from './components/SidebarScrollSpy';
import TaskList from './components/TaskList';



class App extends React.Component {

	componentDidMount() {	   
		window.addEventListener('scroll', this.handleScroll);		
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	sidebarPositionFixed (position_top_limit, base_div, fixed_div){   
      
      var base_div_position = base_div.getBoundingClientRect().top;     
      
      if(base_div_position <= position_top_limit){      
        fixed_div.classList.add("position-fixed");
      }else if (base_div_position > position_top_limit){
        fixed_div.classList.remove("position-fixed");
      }
    }
    
    scrollspy (div_ids, fixed_div){
		div_ids.reverse();
		var div_count = div_ids.length;
		var highlight = false, x;
		for(x=0; x < div_count; x++){
			document.getElementById('li-'+div_ids[x]).classList.remove("active");
			if(!highlight){
				var pos = document.getElementById(div_ids[x]).getBoundingClientRect().top + 10;

				if(pos <= fixed_div.getBoundingClientRect().bottom){
					highlight = true;
					document.getElementById('li-'+div_ids[x]).classList.add("active");

				}
			}
		}  
	}
	
	handleScroll = () => {
		var div_ids = ['taskbox-1', 'taskbox-2', 'taskbox-3', 'taskbox-4'];
		var position_top_limit = 65;

		var base_div = document.getElementById('sheet-answer-form');
		var fixed_div = document.getElementById('affix-sidebar');

		this.sidebarPositionFixed(position_top_limit, base_div, fixed_div);
		this.scrollspy(div_ids, fixed_div);
	}
	
  render() {
    return (
     
		<section className="content" id="content">
			<div className="row">
				<div className="col-md-3 col-md-push-9">            
					
					<SideBarScrollSpy/>
				
				</div>
		  
				<div className="col-md-9 col-md-pull-3">
             
					<TaskList/>
					
				</div>
				
            </div>
			
      </section>
    );
  }
}


export default App;



