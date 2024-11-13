<template>
  <div class="file-upload">
    <h2>Upload GeoJSON/KML/TIFF</h2>
    <input type="file" @change="onFileChange" />
    <button @click="uploadFile" >Upload</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if(this.file){
      try {
        await this.$store.dispatch('uploadFile', this.file);
        console.log('File uploaded');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      }{
        alert('Please select a file.');
      }
    }
  }
};
</script>

<style scoped>
.file-upload {
  margin-bottom: 20px;
}
</style>
