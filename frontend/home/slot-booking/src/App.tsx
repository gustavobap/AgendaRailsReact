import React from 'react';
import { timeSlotsService } from './Api';


interface Props {

}

interface State {

}

class App extends React.Component<Props, State> {


  componentDidMount(){
    timeSlotsService.list().then((slots) => {
      console.log(slots)
    })
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;
