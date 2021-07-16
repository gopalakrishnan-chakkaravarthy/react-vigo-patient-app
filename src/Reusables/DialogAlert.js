import * as React from 'react';
class DialogAlert {
  openAlert = message => {
    alert(message);
  };

  openTwoButtonAlert = (messageOne, messageTwo) => {
    Alert.alert(
      messageOne,
      messageTwo,
      [
        {text: 'Yes', onPress: () => console.log('Yes button clicked')},
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  openThreeButtonAlert = (messageOne, messageTwo, messageThree) => {
    Alert.alert(
      messageOne,
      messageTwo,
      [
        {
          text: messageThree,
          onPress: () => console.log('Later button clicked'),
        },
        {text: 'Yes', onPress: () => console.log('Yes button is clicked')},
        {text: 'OK', onPress: () => console.log('OK button clicked')},
      ],
      {
        cancelable: false,
      },
    );
  };
}
export default new DialogAlert();
