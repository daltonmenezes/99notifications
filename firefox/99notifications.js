if (window.location.hostname.indexOf('99designs') !== -1) {

    let title = document.title
    let oldNotificationNumber = 0
    let sound = document.createElement('audio')
    let notificationIcon = browser.extension.getURL('icons/99n.png')

    sound.src = 'https://notificationsounds.com/soundfiles/eba0dc302bcd9a273f8bbb72be3a687b/file-a1_ascendent-64kbps.mp3'
    sound.preload = 'auto'

    Notification.requestPermission().then(status => {
      if (status === 'granted') return console.log('Allowed to send notifications')

      console.log('Denied to send notifications')
    })

    observer = new MutationObserver(mutations => {
      
      notificationTag = document.querySelectorAll('.pill--tiny')[2]
      currentNotificationNumber =  notificationTag ? notificationTag.innerHTML : null
      notificationWordGrammar = currentNotificationNumber > 1 ? 'notifications' : 'notification'
      
      if (currentNotificationNumber !== null && 
          currentNotificationNumber !== undefined &&
          currentNotificationNumber !== oldNotificationNumber) {

          new Notification('99Notifications', {
                body: `You have ${currentNotificationNumber} unread ${notificationWordGrammar}!`,
                icon: notificationIcon
              })      
          
          oldNotificationNumber = currentNotificationNumber
          sound.play()

          return document.title = `(${currentNotificationNumber}) ${title}`
      }

      document.title = title
      
    }).observe(document.querySelector('.onsite-notifications'), {
        childList: true,
        subtree: true,
        characterData: true
    })
}
