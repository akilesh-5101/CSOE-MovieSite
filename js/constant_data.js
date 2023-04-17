class Data{
     constructor(){   
       this.data = JSON.parse(JSON.stringify(TV_SHOWS));
       this.emo = String.fromCodePoint(0x1F604);   
       this.startPos = 0;
       this.endPos = 0; 
       this.isDragging = false;
       this.currentTranslate = 0;
       this.prevTranslate = 0;
       this.animationID = 0;
       this.epi = 0;
       this.check = 0;
    }
    message(){
      return 'Greetings Madam '+ this.emo+ '! I hereby declare that the work before you is authentic and not copied from other sources. The github link for the assignment files is also given below: \nhttps://github.com/akilesh-5101/CSOE-MovieSite'
    }
}