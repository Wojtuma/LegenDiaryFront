import React from 'react'
import './Sidebar.css'
export default class SlideDrawer extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         textToRead: 'To jest tekst do przeczytania',
      };
   }
   render() {
       let drawerClasses = 'side-drawer'
       if(this.props.show) {
          drawerClasses = 'side-drawer open'
       }
   
       return(
   
          <div className={drawerClasses}>
            <h1>Hello, I'm sliding!</h1>
            <h2>{this.props.title}</h2>
            <h4>{this.props.description}</h4>
         
            
          </div>
)
    }
    
}