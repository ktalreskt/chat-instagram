const app = Vue.createApp({
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        if (response.status === 200) {
          this.messages = response.data;
          console.log('Mensajes obtenidos correctamente:', this.messages);
        } else {
          console.error('Error al obtener mensajes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        try {
          const response = await axios.post('http://localhost:3000/messages', { text: this.newMessage });
          if (response.status === 200) {
            this.messages.push({ id: response.data.id, text: this.newMessage });
            this.newMessage = '';
            console.log('Mensaje enviado correctamente:', this.newMessage);
          } else {
            console.error('Error al enviar mensaje:', response.statusText);
          }
        } catch (error) {
          console.error('Error al enviar mensaje:', error);
        }
      }
    },
    async deleteMessage(messageId) {
      try {
        const response = await axios.delete(`http://localhost:3000/messages/${messageId}`);
        if (response.status === 200) {
          this.messages = this.messages.filter(message => message.id !== messageId);
          console.log('Mensaje eliminado correctamente:', messageId);
        } else {
          console.error('Error al eliminar mensaje:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar mensaje:', error);
      }
    },
    async deleteAllMessages() {
      try {
        const response = await axios.delete('http://localhost:3000/messages/all');
        if (response.status === 200) {
          this.messages = [];
          console.log('Todos los mensajes han sido eliminados.');
        } else {
          console.error('Error al eliminar todos los mensajes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar todos los mensajes:', error);
      }
    },
    logout() {
      // Lógica para el logout si es necesario
      console.log('Logout');
    }
  },
  mounted() {
    this.fetchMessages();
  }
});

app.mount('#app');