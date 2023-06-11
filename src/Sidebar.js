import React from 'react'
import './Sidebar.css'
import TextToSpeech from './TextToSpeech';
export default class SlideDrawer extends React.Component {
   constructor(props) {
      super(props)
      this.handleSidebarClose = this.handleSidebarClose.bind(this);
      this.state = {
      };
   }

   handleSidebarClose() {
      this.props.toggle("","");
   }

   render() {
       let drawerClasses = 'side-drawer'
       if(this.props.show) {
          drawerClasses = 'side-drawer open'
       }
   
       return(
   
          <div className={drawerClasses}>
          
          <button className='sidebarCloseBtn' onClick={this.handleSidebarClose}>x</button>
            <div className='title'>{this.props.title}</div>
            <div className='description'>{this.props.description}</div>
            <div className='TextToSpeech'>
               <TextToSpeech text={this.props.description} />  
            </div>
          </div>
)
    }
    
}