import React from 'react';
import { timeSlotsService } from './Api';
import { timeSlotsListener } from './Cable';


interface Props {

}

interface State {

}

class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
  }

  componentDidMount(){
    console.log('mmmmm')
    timeSlotsService.list().then((slots) => {
      console.log(slots)
    })
    timeSlotsListener.subscribe(new Date())
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;
