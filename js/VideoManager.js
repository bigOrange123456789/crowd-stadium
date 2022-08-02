function VideoManager() {
    this.div;
    this.video;
    this.videoTexture;
    this.finish;
}
VideoManager.prototype={
    init:function () {
        this.finish=false;
        // console.log("this.div",this.div)
        // if(this.div!==undefined)return;
        this.div=getDiv();
        document.body.append(this.div)
        console.log("this.div",this.div)
        this.video=getVideo();
        this.div.append(this.video);
        function getDiv(){
            return document.createElement('div');
        }
        function getVideo(){
            var oPanel=document.createElement('Audio');
            oPanel.style.cssText= 'loop;';
            oPanel.src="test.mp3";
            return oPanel;
        }
    },
    setPlay:function () {
        window.start=true;
        if(this.div===undefined)this.init();
        this.video.volume=0.7;
        this.video.play();
        //this.video.pause();
        window.video=this.video;
    },
}
