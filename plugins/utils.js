import Vue from 'vue'

const utils = {

  install(Vue, options) {

    Vue.prototype.$toast = function (msg, 
        color = 'default',
        duration = 3000,
        position = 'bottom'
      ) {

      let textColor = 'text-gray-800'
      switch (color) {
        case 'default':
          color = 'bg-gray-200'
          break;
        case 'dark':
          color = 'bg-gray-800'
          textColor = 'text-white'
          break;
        case 'success':
          color = 'bg-limegreen-600'
          textColor = 'text-white'
          break;
        case 'fail':
          color = 'bg-maroon-600'
          textColor = 'text-white'
          break;
        case 'warning':
          color = 'bg-orange-300'
          // textColor = 'text-white'
          break;
      
        default:
          break;
      }

      let ExitDuration = 1500
      let toast = document.createElement("p"); // Create a <button> element
      let layout = document.getElementById('__layout')
      toast.innerHTML = msg; // Insert text
      toast.classList.add(color, textColor, 'bz-toast', `bz-toast__${position}`)
      layout.style.position = 'relative'
      layout.appendChild(toast)
      
        this.$anime({
          targets: '.bz-toast',
          opacity: 1,
          duration: 500,
          bottom: {
            value: -200,
            duration: ExitDuration,
            delay: duration,
          },
          easing: 'easeInOutQuart'
        })


      setTimeout(() => {
        
        toast.remove()
      }, duration + ExitDuration + 100);



      // Vue.component('anchored-heading', {
      //   render: function (createElement) {
      //     return createElement(
      //       'p', // tag name
      //       'salam' // array of children
      //     )
      //   },
      //   created(){
          
      //   }
      // })
    }
  }
}


Vue.use(utils, {})