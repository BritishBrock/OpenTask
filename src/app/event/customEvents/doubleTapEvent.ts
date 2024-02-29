export const detectDoubleTapClosure = (lastTap:any,callback:any,value:any) =>{
      const curTime = new Date().getTime();
      const tapLen = curTime - lastTap;
      if (tapLen < 500 && tapLen > 0) {
        callback.next(value);
      }
       return  curTime;
  }
