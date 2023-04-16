class Time{
     constructor(){
          this.time_checked = [];
          this.head_time = document.querySelector('.container');
          this.time_div = document.createElement('div');
          this.time_head = document.createElement('h1');
          this.time_dhm = document.createElement('h1');
          this.time_div.classList.add('time-div');
          this.time_head.classList.add('time-head', 'time');
          this.time_head.textContent = 'Total Time Spent';
          this.time_dhm.classList.add('time-dhm', 'time');
          this.time_dhm.textContent = '0 days, 0 hours, 0 minutes';
          this.head_time.appendChild(this.time_div);
          this.time_div.appendChild(this.time_head);
          this.time_div.appendChild(this.time_dhm);
     } 

     changeTime(show,season,episode,c){
          var days = parseInt(Times.time_dhm.textContent.split(' ')[0],10);
          var hours = parseInt(Times.time_dhm.textContent.split(' ')[2],10);
          var minutes = parseInt(Times.time_dhm.textContent.split(' ')[4],10);
          var time = days*1440 + hours*60 + minutes;
         
          time = time + c*data.data[show].seasons[season-1][episode].runtime;

          [days,hours,minutes] = this.min_to_dhm(time);
          this.time_dhm.textContent = ''+days+' days, '+hours+' hours, '+minutes+' minutes';
     }

     min_to_dhm(time){
         const d = Math.floor(time/1440);
         time = time % 1440;
         const h = Math.floor(time/60);
         time = time % 60;
         const m = time;
         return [d,h,m];
     }
}