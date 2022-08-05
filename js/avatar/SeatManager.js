class SeatManager {

    constructor() {

        this.positions = [];
        this.chairs = new THREE.Object3D();
        this.chairs.visible=false
        this.positions=[]//
        var seats=[[[125.6, 2.71, -145.97], [128.0, 4.21, -145.97], [130.4, 5.71, -145.97], [132.8, 7.21, -145.97], [135.2, 8.71, -145.97], [137.6, 10.21, -145.97], [140.0, 11.71, -145.97], [142.4, 13.21, -145.97], [144.8, 14.71, -145.97], [147.2, 16.21, -145.97], [149.6, 17.71, -145.97], [152.0, 19.21, -145.97], [154.4, 20.71, -145.97], [156.8, 22.21, -145.97], [159.2, 23.71, -145.97], [161.6, 25.21, -145.97], [164.0, 26.71, -145.97], [166.4, 28.21, -145.97], [168.8, 29.71, -145.97], [171.2, 31.21, -145.97], [175.69, 34.0, -142.45], [178.21, 35.5, -142.45], [182.62, 35.5, -142.45], [185.25, 36.72, -142.45], [182.62, 44.6, -142.45], [185.25, 45.82, -142.45]], [[125.6, 2.71, -122.17], [128.0, 4.21, -122.17], [130.4, 5.71, -122.17], [132.8, 7.21, -122.17], [135.2, 8.71, -122.17], [137.6, 10.21, -122.17], [140.0, 11.71, -122.17], [142.4, 13.21, -122.17], [144.8, 14.71, -122.17], [147.2, 16.21, -122.17], [149.6, 17.71, -122.17], [152.0, 19.21, -122.17], [154.4, 20.71, -122.17], [156.8, 22.21, -122.17], [159.2, 23.71, -122.17], [161.6, 25.21, -122.17], [164.0, 26.71, -122.17], [166.4, 28.21, -122.17], [168.8, 29.71, -122.17], [171.2, 31.21, -122.17], [175.69, 34.0, -124.27], [178.21, 35.5, -124.27], [185.25, 36.72, -124.27], [182.62, 35.5, -124.27], [182.62, 44.6, -124.27], [185.25, 45.82, -124.27]], [[125.6, 2.71, -86.83], [128.0, 4.21, -86.83], [130.4, 5.71, -86.83], [132.8, 7.21, -86.83], [135.2, 8.71, -86.83], [137.6, 10.21, -86.83], [140.0, 11.71, -86.83], [142.4, 13.21, -86.83], [144.8, 14.71, -86.83], [147.2, 16.21, -86.83], [149.6, 17.71, -86.83], [152.0, 19.21, -86.83], [154.4, 20.71, -86.83], [156.8, 22.21, -86.83], [159.2, 23.71, -86.83], [161.6, 25.21, -86.83], [164.0, 26.71, -86.83], [166.4, 28.21, -86.83], [168.8, 29.71, -86.83], [171.2, 31.21, -86.83], [175.69, 34.0, -84.11], [178.21, 35.5, -84.11], [182.62, 35.5, -84.11], [185.25, 36.72, -84.11], [182.62, 44.6, -84.11], [185.25, 45.82, -84.11]], [[130.4, 5.71, -51.42], [132.8, 7.21, -51.42], [135.2, 8.71, -51.42], [137.6, 10.21, -51.42], [140.0, 11.71, -51.42], [142.4, 13.21, -51.42], [144.8, 14.71, -51.42], [147.2, 16.21, -51.42], [149.6, 17.71, -51.42], [152.0, 19.21, -51.42], [154.4, 20.71, -51.42], [156.8, 22.21, -51.42], [159.2, 23.71, -51.42], [161.6, 25.21, -51.42], [164.0, 26.71, -51.42], [166.4, 28.21, -51.42], [168.8, 29.71, -51.42], [171.2, 31.21, -51.42], [175.69, 34.0, -53.51], [178.21, 35.5, -53.51], [182.62, 35.5, -53.51], [185.25, 36.72, -53.51], [182.62, 44.6, -53.51], [185.25, 45.82, -53.51]], [[132.8, 7.21, -15.85], [132.8, 7.21, 5.2], [135.2, 8.71, 5.2], [135.2, 8.71, -15.85], [137.6, 10.21, -15.85], [137.6, 10.21, 5.2], [140.0, 11.71, 5.2], [140.0, 11.71, -15.85], [142.4, 13.21, -15.85], [144.8, 14.71, -15.85], [147.2, 16.21, -15.85], [149.6, 17.71, -15.85], [152.0, 19.21, -15.85], [154.4, 20.71, -15.85], [156.8, 22.21, -15.85], [159.2, 23.71, -15.85], [161.6, 25.21, -15.85], [164.0, 26.71, -15.85], [166.4, 28.21, -15.85], [168.8, 29.71, -15.85], [171.2, 31.21, -15.85], [175.69, 34.0, -13.13], [178.21, 35.5, -13.13], [182.62, 35.5, -13.13], [185.25, 36.72, -13.13], [182.62, 44.6, -13.13], [185.25, 45.82, -13.13]], [[130.4, 5.71, 20.05], [132.8, 7.21, 20.05], [135.2, 8.71, 20.05], [137.6, 10.21, 20.05], [140.0, 11.71, 20.05], [142.4, 13.21, 20.05], [144.8, 14.71, 20.05], [147.2, 16.21, 20.05], [149.6, 17.71, 20.05], [152.0, 19.21, 20.05], [154.4, 20.71, 20.05], [156.8, 22.21, 20.05], [159.2, 23.71, 20.05], [161.6, 25.21, 20.05], [164.0, 26.71, 20.05], [166.4, 28.21, 20.05], [168.8, 29.71, 20.05], [171.2, 31.21, 20.05], [175.69, 34.0, 17.95], [178.21, 35.5, 17.95], [182.62, 35.5, 17.95], [185.25, 36.72, 17.95], [182.62, 44.6, 17.95], [185.25, 45.82, 17.95]], [[125.6, 2.71, 55.61], [128.0, 4.21, 55.61], [130.4, 5.71, 55.61], [132.8, 7.21, 55.61], [135.2, 8.71, 55.61], [137.6, 10.21, 55.61], [140.0, 11.71, 55.61], [142.4, 13.21, 55.61], [144.8, 14.71, 55.61], [147.2, 16.21, 55.61], [149.6, 17.71, 55.61], [152.0, 19.21, 55.61], [154.4, 20.71, 55.61], [156.8, 22.21, 55.61], [159.2, 23.71, 55.61], [161.6, 25.21, 55.61], [164.0, 26.71, 55.61], [166.4, 28.21, 55.61], [168.8, 29.71, 55.61], [171.2, 31.21, 55.61], [175.69, 34.0, 58.33], [178.21, 35.5, 58.33], [182.62, 35.5, 58.33], [185.25, 36.72, 58.33], [182.62, 44.6, 58.33], [185.25, 45.82, 58.33]], [[125.6, 2.71, 90.95], [128.0, 4.21, 90.95], [130.4, 5.71, 90.95], [132.8, 7.21, 90.95], [135.2, 8.71, 90.95], [137.6, 10.21, 90.95], [140.0, 11.71, 90.95], [142.4, 13.21, 90.95], [144.8, 14.71, 90.95], [147.2, 16.21, 90.95], [149.6, 17.71, 90.95], [152.0, 19.21, 90.95], [154.4, 20.71, 90.95], [156.8, 22.21, 90.95], [159.2, 23.71, 90.95], [161.6, 25.21, 90.95], [164.0, 26.71, 90.95], [166.4, 28.21, 90.95], [168.8, 29.71, 90.95], [171.2, 31.21, 90.95], [175.69, 34.0, 88.93], [178.21, 35.5, 88.93], [182.62, 35.5, 88.93], [185.25, 36.72, 88.93], [182.62, 44.6, 88.93], [185.25, 45.82, 88.93]], [[125.6, 2.71, 126.37], [128.0, 4.21, 126.37], [130.4, 5.71, 126.37], [132.8, 7.21, 126.37], [135.2, 8.71, 126.37], [137.6, 10.21, 126.37], [140.0, 11.71, 126.37], [142.4, 13.21, 126.37], [144.8, 14.71, 126.37], [147.2, 16.21, 126.37], [149.6, 17.71, 126.37], [152.0, 19.21, 126.37], [154.4, 20.71, 126.37], [156.8, 22.21, 126.37], [159.2, 23.71, 126.37], [161.6, 25.21, 126.37], [164.0, 26.71, 126.37], [166.4, 28.21, 126.37], [168.8, 29.71, 126.37], [171.2, 31.21, 126.37], [175.69, 34.0, 129.09], [178.21, 35.5, 129.09], [182.62, 35.5, 129.09], [185.25, 36.72, 129.09], [182.62, 44.6, 129.09], [185.25, 45.82, 129.09]], [[72.89, 12.99, 213.31], [72.89, 11.88, 211.14], [62.76, 12.99, 213.31], [62.76, 11.88, 211.14], [48.23, 12.99, 213.31], [48.23, 11.88, 211.14]], [[2.1, 11.71, 203.33], [2.1, 13.21, 205.73], [2.1, 14.71, 208.13], [2.1, 16.21, 210.53], [2.1, 17.71, 212.93], [2.1, 19.21, 215.33], [2.1, 20.71, 217.73], [2.1, 22.21, 220.13], [-25.65, 22.21, 220.13], [-25.65, 20.71, 217.73], [-25.65, 19.21, 215.33], [-25.65, 17.71, 212.93], [-25.65, 16.21, 210.53], [-25.65, 14.71, 208.13], [-25.65, 13.21, 205.73], [-25.65, 11.71, 203.33]], [[-82.61, 12.99, 213.31], [-82.61, 11.88, 211.14], [-72.48, 12.99, 213.31], [-72.48, 11.88, 211.14], [-57.96, 12.99, 213.31], [-57.96, 11.88, 211.14]], [[-125.6, 2.71, 126.37], [-128.0, 4.21, 126.37], [-130.4, 5.71, 126.37], [-132.8, 7.21, 126.37], [-135.2, 8.71, 126.37], [-137.6, 10.21, 126.37], [-140.0, 11.71, 126.37], [-142.4, 13.21, 126.37], [-144.8, 14.71, 126.37], [-147.2, 16.21, 126.37], [-149.6, 17.71, 126.37], [-152.0, 19.21, 126.37], [-154.4, 20.71, 126.37], [-156.8, 22.21, 126.37], [-159.2, 23.71, 126.37], [-161.6, 25.21, 126.37], [-164.0, 26.71, 126.37], [-166.4, 28.21, 126.37], [-168.8, 29.71, 126.37], [-171.2, 31.21, 126.37], [-173.6, 32.71, 126.37], [-176.0, 34.21, 126.37], [-174.76, 45.04, 126.37], [-177.16, 46.54, 126.37], [-179.56, 48.04, 126.37], [-181.96, 49.54, 126.37], [-184.36, 51.04, 126.37], [-186.76, 52.54, 126.37], [-189.16, 54.04, 126.37], [-191.56, 55.54, 126.37]], [[-125.6, 2.71, 91.03], [-128.0, 4.21, 91.03], [-130.4, 5.71, 91.03], [-132.8, 7.21, 91.03], [-135.2, 8.71, 91.03], [-137.6, 10.21, 91.03], [-140.0, 11.71, 91.03], [-142.4, 13.21, 91.03], [-144.8, 14.71, 91.03], [-147.2, 16.21, 91.03], [-149.6, 17.71, 91.03], [-152.0, 19.21, 91.03], [-154.4, 20.71, 91.03], [-156.8, 22.21, 91.03], [-159.2, 23.71, 91.03], [-161.6, 25.21, 91.03], [-164.0, 26.71, 91.03], [-166.4, 28.21, 91.03], [-168.8, 29.71, 91.03], [-171.2, 31.21, 91.03], [-173.6, 32.71, 92.05], [-176.0, 34.21, 92.05], [-174.76, 45.04, 91.03], [-177.16, 46.54, 91.03], [-179.56, 48.04, 91.03], [-181.96, 49.54, 91.03], [-184.36, 51.04, 91.03], [-186.76, 52.54, 91.03], [-189.16, 54.04, 91.03], [-191.56, 55.54, 91.03]], [[-125.6, 2.71, 55.61], [-128.0, 4.21, 55.61], [-130.4, 5.71, 55.61], [-132.8, 7.21, 55.61], [-135.2, 8.71, 55.61], [-137.6, 10.21, 55.61], [-140.0, 11.71, 55.61], [-142.4, 13.21, 55.61], [-144.8, 14.71, 55.61], [-147.2, 16.21, 55.61], [-149.6, 17.71, 55.61], [-152.0, 19.21, 55.61], [-154.4, 20.71, 55.61], [-156.8, 22.21, 55.61], [-159.2, 23.71, 55.61], [-161.6, 25.21, 55.61], [-164.0, 26.71, 55.61], [-166.4, 28.21, 55.61], [-168.8, 29.71, 55.61], [-171.2, 31.21, 55.61], [-173.6, 32.71, 56.64], [-176.0, 34.21, 56.64], [-174.76, 45.04, 75.81], [-177.16, 46.54, 75.81], [-179.56, 48.04, 75.81], [-181.96, 49.54, 75.81], [-184.36, 51.04, 75.81], [-186.76, 52.54, 75.81], [-189.16, 54.04, 75.81], [-191.56, 55.54, 75.81], [-191.56, 55.54, 55.61], [-189.16, 54.04, 55.61], [-186.76, 52.54, 55.61], [-184.36, 51.04, 55.61], [-181.96, 49.54, 55.61], [-179.56, 48.04, 55.61], [-177.16, 46.54, 55.61], [-174.76, 45.04, 55.61]], [[-125.6, 2.71, 20.05], [-128.0, 4.21, 20.05], [-130.4, 5.71, 20.05], [-132.8, 7.21, 20.05], [-135.2, 8.71, 20.05], [-137.6, 10.21, 20.05], [-140.0, 11.71, 20.05], [-142.4, 13.21, 20.05], [-144.8, 14.71, 20.05], [-147.2, 16.21, 20.05], [-149.6, 17.71, 20.05], [-152.0, 19.21, 20.05], [-154.4, 20.71, 20.05], [-156.8, 22.21, 20.05], [-159.2, 23.71, 20.05], [-161.6, 25.21, 20.05], [-164.0, 26.71, 20.05], [-166.4, 28.21, 20.05], [-168.8, 29.71, 20.05], [-171.2, 31.21, 20.05], [-173.6, 32.71, 21.08], [-176.0, 34.21, 21.08], [-189.16, 54.04, 20.05], [-191.56, 55.54, 20.05]], [[-125.6, 2.71, -15.85], [-128.0, 4.21, -15.85], [-130.4, 5.71, -15.85], [-132.8, 7.21, -15.85], [-135.2, 8.71, -15.85], [-137.6, 10.21, -15.85], [-140.0, 11.71, -15.85], [-142.4, 13.21, -15.85], [-144.8, 14.71, -15.85], [-147.2, 16.21, -15.85], [-149.6, 17.71, -15.85], [-152.0, 19.21, -15.85], [-154.4, 20.71, -15.85], [-156.8, 22.21, -15.85], [-159.2, 23.71, -15.85], [-161.6, 25.21, -15.85], [-164.0, 26.71, -15.85], [-166.4, 28.21, -15.85], [-168.8, 29.71, -15.85], [-171.2, 31.21, -15.85], [-173.6, 32.71, -14.78], [-176.0, 34.21, -14.78], [-189.16, 54.04, -15.85], [-191.56, 55.54, -15.85]], [[-125.6, 2.71, -51.42], [-128.0, 4.21, -51.42], [-130.4, 5.71, -51.42], [-132.8, 7.21, -51.42], [-135.2, 8.71, -51.42], [-137.6, 10.21, -51.42], [-140.0, 11.71, -51.42], [-142.4, 13.21, -51.42], [-144.8, 14.71, -51.42], [-147.2, 16.21, -51.42], [-149.6, 17.71, -51.42], [-152.0, 19.21, -51.42], [-154.4, 20.71, -51.42], [-156.8, 22.21, -51.42], [-159.2, 23.71, -51.42], [-161.6, 25.21, -51.42], [-164.0, 26.71, -51.42], [-166.4, 28.21, -51.42], [-168.8, 29.71, -51.42], [-171.2, 31.21, -51.42], [-176.0, 34.21, -50.38], [-173.6, 32.71, -50.38], [-189.16, 54.04, -51.42], [-191.56, 55.54, -51.42]], [[-125.6, 2.71, -86.83], [-128.0, 4.21, -86.83], [-130.4, 5.71, -86.83], [-132.8, 7.21, -86.83], [-135.2, 8.71, -86.83], [-137.6, 10.21, -86.83], [-140.0, 11.71, -86.83], [-142.4, 13.21, -86.83], [-144.8, 14.71, -86.83], [-147.2, 16.21, -86.83], [-149.6, 17.71, -86.83], [-152.0, 19.21, -86.83], [-154.4, 20.71, -86.83], [-156.8, 22.21, -86.83], [-159.2, 23.71, -86.83], [-161.6, 25.21, -86.83], [-164.0, 26.71, -86.83], [-166.4, 28.21, -86.83], [-168.8, 29.71, -86.83], [-171.2, 31.21, -86.83], [-173.6, 32.71, -85.8], [-176.0, 34.21, -85.8], [-174.76, 45.04, -66.64], [-177.16, 46.54, -66.64], [-179.56, 48.04, -66.64], [-181.96, 49.54, -66.64], [-184.36, 51.04, -66.64], [-186.76, 52.54, -66.64], [-189.16, 54.04, -66.64], [-191.56, 55.54, -66.64], [-191.56, 55.54, -86.83], [-189.16, 54.04, -86.83], [-186.76, 52.54, -86.83], [-184.36, 51.04, -86.83], [-181.96, 49.54, -86.83], [-179.56, 48.04, -86.83], [-177.16, 46.54, -86.83], [-174.76, 45.04, -86.83]], [[-125.6, 2.71, -122.17], [-128.0, 4.21, -122.17], [-130.4, 5.71, -122.17], [-132.8, 7.21, -122.17], [-135.2, 8.71, -122.17], [-137.6, 10.21, -122.17], [-140.0, 11.71, -122.17], [-142.4, 13.21, -122.17], [-144.8, 14.71, -122.17], [-147.2, 16.21, -122.17], [-149.6, 17.71, -122.17], [-152.0, 19.21, -122.17], [-154.4, 20.71, -122.17], [-156.8, 22.21, -122.17], [-159.2, 23.71, -122.17], [-161.6, 25.21, -122.17], [-164.0, 26.71, -122.17], [-166.4, 28.21, -122.17], [-168.8, 29.71, -122.17], [-171.2, 31.21, -122.17], [-173.6, 32.71, -121.42], [-176.0, 34.21, -121.42], [-174.76, 45.04, -122.17], [-177.16, 46.54, -122.17], [-179.56, 48.04, -122.17], [-181.96, 49.54, -122.17], [-184.36, 51.04, -122.17], [-186.76, 52.54, -122.17], [-189.16, 54.04, -122.17], [-191.56, 55.54, -122.17]], [[-125.6, 2.71, -145.97], [-128.0, 4.21, -145.97], [-130.4, 5.71, -145.97], [-132.8, 7.21, -145.97], [-135.2, 8.71, -145.97], [-137.6, 10.21, -145.97], [-140.0, 11.71, -145.97], [-142.4, 13.21, -145.97], [-144.8, 14.71, -145.97], [-147.2, 16.21, -145.97], [-149.6, 17.71, -145.97], [-152.0, 19.21, -145.97], [-154.4, 20.71, -145.97], [-156.8, 22.21, -145.97], [-159.2, 23.71, -145.97], [-161.6, 25.21, -145.97], [-164.0, 26.71, -145.97], [-166.4, 28.21, -145.97], [-168.8, 29.71, -145.97], [-171.2, 31.21, -145.97], [-173.6, 32.71, -145.97], [-176.0, 34.21, -145.97], [-174.76, 45.04, -148.07], [-177.16, 46.54, -148.07], [-179.56, 48.04, -148.07], [-181.96, 49.54, -148.07], [-184.36, 51.04, -148.07], [-186.76, 52.54, -148.07], [-189.16, 54.04, -148.07], [-191.56, 55.54, -148.07]]]


        var numbers0=[
            //0  1  2  3  4  5  6  7   8
            11, 17,17,17, 6, 17,17,17, 11,
        ]
        for(var i0=0;i0<numbers0.length;i0++)
        for(var i in seats[i0]){
            var s=seats[i0][i]
            var test_add=0
            if(i0===4){
                //if(i==0)test_add=11
                if(8<=i&&i<=20)test_add=11
                if(21<=i&&i<=27)test_add=10
            } 
            for(var j=0;j<numbers0[i0]+test_add;j++){
                this.positions.push([
                    s[0]-3,//前后
                    s[1]-2.,//上下
                    s[2]+j*1.81+1,

                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }

            //开始修补边角
            if(i0==8){//i0是区域编号
                // console.log(s[0]-3)
                if(s[0]-3<170)
                for(var j=0;j<6;j++){//列数
                    this.positions.push([
                        s[0]-3-0.1*j,//前后
                        s[1]-2.,//上下
                        s[2]+j*(1.81+(s[0]-122.6)*0.016)+1+24,//左右
    
                        Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                        Math.PI / 2, 0, -3 * Math.PI / 2
                    ])
                }
                if(s[0]-3<170)
                for(var j=6;j<9+Math.floor((s[0]-122.6)*0.1);j++){//列数
                    this.positions.push([
                        s[0]-1.-0.6*j,//前后
                        s[1]-2.5,//上下
                        s[2]+j*(1.81+(s[0]-122.6)*0.016)+1+25,//左右
    
                        Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                        Math.PI / 2, 0, -3 * Math.PI / 2
                    ])
                }
                // if(s[0]-3<170)
                // for(var j=9;j<11;j++){//列数
                //     this.positions.push([
                //         s[0]-8.8-0.148*j,//前后
                //         s[1]-.8,//上下
                //         s[2]+j*(1.81+(s[0]-122.6)*0.016)+1+40,//左右
    
                //         Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                //         Math.PI / 2, 0, -3 * Math.PI / 2
                //     ])
                // }
            }
        }



        
        var numbers1=[
            5, 13,5,
        ]
        for(var i0=0;i0<numbers1.length;i0++)
        for(var i in seats[i0+numbers0.length]){
            var s=seats[i0+numbers0.length][i]
            var test_add=0
            if(i0===4){
                //if(i==0)test_add=11
                if(8<=i&&i<=20)test_add=11
                if(21<=i&&i<=27)test_add=10
            } 
            for(var j=0;j<numbers1[i0]+test_add;j++){
                this.positions.push([
                    s[0]+j*1.8-1,//左右
                    s[1]-2.,//上下
                    s[2]-1.5,//前后
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }

        var numbers2=[
           //0   1 2 3  4  5   6  7    8 
            11, 17,6,17,17,17, 6, 17, 11, 
        ]
        for(var i0=0;i0<numbers2.length;i0++)
        for(var i in seats[i0+numbers0.length+numbers1.length]){
            var s=seats[i0+numbers0.length+numbers1.length][i]
            var test_add=0
            if(i0===8){
                if(i>21)test_add=1
            } 
            else if(i0===6){
                if(i<20)test_add=11
                else if(20<=i&&i<=21)test_add=10
            } else if(i0===2){
                if(i<20)test_add=11
                else if(20<=i&&i<=21)test_add=10
            } else if(i0===0){
                if(i>=22)test_add=1
            } else {
                if(20<=i&&i<=21)test_add=-1
            }
            for(var j=0;j<numbers2[i0]+test_add;j++){
                this.positions.push([
                    s[0]-0.5,
                    s[1]-2,
                    s[2]+j*1.83+1.1,//左右

                    Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2,
                    Math.PI / 2, 0, 3 * Math.PI / 2
                ])
            }
            if(i0==8){
                console.log("s",s)
                if(s[0]>-174)
                for(var j=0;j<numbers2[i0]-4;j++){
                    this.positions.push([
                        s[0]+0.5,//前后
                        s[1]-2,//上下
                        s[2]+j*1.83-16.,//左右
    
                        Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2,
                        Math.PI / 2, 0, 3 * Math.PI / 2
                    ])
                }
            }
        }

           
        //alert(this.positions.length)
        // this.positions=[]
        // 开始设置长凳的位置
        // 北侧座位
        var p=[-79,  12,  -180.4]//[-184.36, 51.04, -148.07]
        for(var i=0;i<22;i++){//长凳的排数
            for(var j=0;j<8;j++){//一排的个数
                this.positions.push([
                    p[0]-8+j*1.81-20,//左右
                    p[1]-11.5+i*1.5,//上下
                    p[2]+3.-i*2.4,//前后
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }
        for(var k=0;k<4;k++)//共有四组
        for(var i=0;i<22;i++){//长凳的排数
            for(var j=0;j<22;j++){//一排的个数
                this.positions.push([
                    p[0]-8+j*1.81+44*k,//左右
                    p[1]-11.5+i*1.5,//上下
                    p[2]+3.-i*2.4,//前后
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }
        for(var i=0;i<22;i++){//长凳的排数
            for(var j=0;j<8;j++){//一排的个数
                this.positions.push([
                    p[0]-8+j*1.81+44*4+1.8,//左右
                    p[1]-11.5+i*1.5,//上下
                    p[2]+3.-i*2.4,//前后
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }

        //南侧座位
        p=[84,  7,  182]
        for(var k=0;k<4;k++)//共有四组
        for(var i=0;i<6;i++){//长凳的排数
            for(var j=0;j<22;j++){//一排的个数
                this.positions.push([
                    p[0]-j*1.81-44.5*k,//-8+,//左右
                    p[1]-6.5+i*1.4,//-11.5,//上下
                    p[2]-1+i*2.4,//+3.,//前后
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }


        // //从这里开始改的!!!
        var p=[84,  7,  182]
        for(var i = 0; i < 6; i++){
            for(var j = 0; j < 6; j++){
                this.positions.push([
                    p[0]-j*1.81+16,
                    p[1]-6.5+i*1.4,//-11.5,//上下
                    p[2]-3.5+i*2.4+j*0.4,//+3.,//前后
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }
        for(var i = 0; i < 6; i++){
            for(var j = 0; j < 6; j++){
                this.positions.push([
                    p[0]-j*1.81-44.5*3-44,
                    p[1]-6.5+i*1.4,//-11.5,//上下
                    p[2]-1+i*2.4-j*0.4,//+3.,//前后
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }

        var p =[-125.1, 0.71, -163.8]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 3 + i/3; j++){
                this.positions.push([
                    p[0]-2.35*i+j*0.5,//前后
                    p[1]+1.5*i,//上下
                    p[2]-i*0.3-j*1.83,//左右
        
                    Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2,
                    Math.PI / 2, 0, 3 * Math.PI / 2
                ])
            }
        }

        var p =[122.1, 0.71, -163.8]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 3 + i/3; j++){
                this.positions.push([
                    p[0]+2.35*i-j*0.5,//前后
                    p[1]+1.5*i,//上下
                    p[2]-i*0.3-j*1.83,//左右
        
                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }
        }
        var p =[122.1, 0.71, -161.97]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 7 + i/11; j++){
                this.positions.push([
                    p[0]+2.4*i,//前后
                    p[1]+1.5*i,//上下
                    p[2]+j*1.83,//左右
        
                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }
        }

        // var p =[122.1, 0.71, 163.8]
        // for(var i = 0; i < 22; i++){
        //     for(var j = 0; j < 3 + i/3; j++){
        //         this.positions.push([
        //             p[0]+2.35*i-j*0.5,//前后
        //             p[1]+1.5*i,//上下
        //             p[2]+i*0.27+j*1.83,//左右
        
        //             Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
        //             Math.PI / 2, 0, -3 * Math.PI / 2
        //         ])
        //     }
        // }


        var p =[-125.1, 0.71, 163.8]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 3 + i/3; j++){
                this.positions.push([
                    p[0]-2.35*i+j*0.5,//前后
                    p[1]+1.5*i,//上下
                    p[2]+i*0.27+j*1.83,//左右
        
                    Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2,
                    Math.PI / 2, 0, 3 * Math.PI / 2
                ])
            }
        }
        var p =[-125.1, 0.71, 151]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 7+i/11; j++){
                this.positions.push([
                    p[0]-2.4*i,//前后
                    p[1]+1.5*i,//上下
                    p[2]+j*1.83,//左右
        
                    Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2,
                    Math.PI / 2, 0, 3 * Math.PI / 2
                ])
            }
        }

        var p =[-107, 0.71, -177.5]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 4 + i/5; j++){
                this.positions.push([
                    p[0]-i*0.3-j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]-2.35*i+j*0.5,//前后
        
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }
        var p =[104, 0.71, -177.5]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 4 + i/5; j++){
                this.positions.push([
                    p[0]+i*0.3+j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]-2.35*i+j*0.5,//前后
        
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }


        var p =[-121.1, 0.71, 173]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]-2.2*i+j*1.4,//前后
                    p[1]+1.5*i,//上下
                    p[2]+i*0.9+j*1.83,//左右
        
                    Math.PI / 2, Math.PI / 2, 3*Math.PI / 2,
                    Math.PI / 2, 0, 3 * Math.PI / 2
                ])
            }
        }
        var p =[-117.5, 0.71, 174]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 2+i/3; j++){
                this.positions.push([
                    p[0]-i*0.75-j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]+2.28*i-j*1.1,//前后
        
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }

        var p =[114, 0.71, 175]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 2+i/2.5; j++){
                this.positions.push([
                    p[0]+i*0.75+j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]+2.28*i-j*1.1,//前后
        
                    0,Math.PI,0,
                    Math.PI/2,0,Math.PI
                ])
            }
        }
        var p =[118, 0.71, 173]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]+2.2*i-j*1.4,//前后
                    p[1]+1.5*i,//上下
                    p[2]+i*0.9+j*1.83,//左右
                    
                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }
        }

        var p =[116, 0.71, -175]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]+i*0.75+j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]-2.28*i+j*1.1,//前后
        
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }
        var p =[118, 0.71, -173]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]+2.2*i-j*1.4,//前后
                    p[1]+1.5*i,//上下
                    p[2]-i*0.9-j*1.83,//左右
                    
                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }
        }

        var p =[-118, 0.71, -175]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]-i*0.75-j*1.83,//左右
                    p[1]+1.5*i,//上下
                    p[2]-2.28*i+j*1.1,//前后
        
                    0,0,0,
                    Math.PI / 2,0,0
                ])
            }
        }
        var p =[-120, 0.71, -173]
        for(var i = 0; i < 22; i++){
            for(var j = 0; j < 1+i/2.5; j++){
                this.positions.push([
                    p[0]-2.2*i+j*1.4,//前后
                    p[1]+1.5*i,//上下
                    p[2]-i*0.9-j*1.83,//左右
                    
                    Math.PI / 2, -Math.PI / 2,  Math.PI / 2,
                    Math.PI / 2, 0, -3 * Math.PI / 2
                ])
            }
        }

        console.log("总人数：",this.positions.length)


    }

}
export { SeatManager };
