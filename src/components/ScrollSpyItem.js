import React from 'react';

const ScrollSpyItem = (props) =>{

		const _id = "li-"+props.id;

		return (
		
		<li id={_id}>
			<a href="#" data-id={props.id} onClick={props.onClickScroll}><span className="prefix">{props.prefix}</span> {props.title} </a>
		</li>
	)
}
export default ScrollSpyItem;