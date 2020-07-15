(function(_aoWin,_aoUndefined){
var gsAgent=navigator.userAgent.toLowerCase(),gsAppVer=navigator.appVersion.toLowerCase(),gsAppName=navigator.appName.toLowerCase(),gbIsOpera=gsAgent.indexOf("opera")>-1,gbIsWebKit=gsAgent.indexOf("applewebkit")>-1,gbIsKHTML=gsAgent.indexOf("khtml")>-1||gsAgent.indexOf("konqueror")>-1||gbIsWebKit,gbIsIE=(gsAgent.indexOf("compatible")>-1&&!gbIsOpera)||gsAgent.indexOf("msie")>-1,gbIsTT=gbIsIE?(gsAppVer.indexOf("tencenttraveler")!=-1?1:0):0,gbIsQBWebKit=gbIsWebKit?(gsAppVer.indexOf("qqbrowser")!=-1?1:0):0,gbIsQPlus=gsAgent.indexOf("qplus")>-1,gbIsSogou=gsAgent.indexOf("se 2.x metasr 1.0")>-1,gbIsChrome=gbIsWebKit&&!gbIsQBWebKit&&gsAgent.indexOf("chrome")>-1&&!gbIsSogou&&!gbIsQPlus,gbIsSafari=gbIsWebKit&&!gbIsChrome&&!gbIsSogou&&!gbIsQBWebKit;
var _sVer="QMWL/11.12.05",_oConfig=_aoWin.QMWLCfg||{},_oTopWin=_aoWin,_oRealTopWin=(function(_aoWin){
for(var _oTestWin=_aoWin,_oRealTopWin=_aoWin;_oTestWin;)
{
try{
_oTestWin=_oTestWin==_oTestWin.parent?_aoUndefined:_oTestWin.parent;
_oTestWin.document&&(_oRealTopWin=_oTestWin);
}
catch(_oError)
{
}
}
return _oRealTopWin;
})(_aoWin),_fQMWL=function(_aoWin,_aoOptDoms,_asOptMode){
var _oSelf=this;
_oSelf._moWin=_aoWin;
if(!_aoOptDoms&&!_asOptMode)
{
_oSelf._moOptData=_aoWin;
_oSelf._msOptMode="non-json";
}
else{
_oSelf._moOptData=_aoOptDoms;
_oSelf._msOptMode=_asOptMode;
}
},_nQMWLGuid=1,_fInstance=function(_aoWin){
if(_aoWin.gbIsTrident||_aoWin.gbIsTrident)
{
_aoWin.QMWin=null;
}
return _aoWin.QMWin||(((_aoWin.$=_aoWin.Q=_aoWin.QMWin=new _fQMWL(_aoWin))["_guid_"]=_aoWin["_guid_"]=_nQMWLGuid++)&&(_fQMWL.instance_(_aoWin)||true)&&_aoWin.$.ready());
},_fIsQMWLObj=function(_aoObj){
return _aoObj&&typeof _aoObj.ctor_=="function"&&_aoObj.ctor_()===_fQMWL;
},_oDebugMode=({"unt":900,"dev":200,"err":100,"usr":0}),_nUntType=_fQMWL.DBG_UNT_TYPE=_oDebugMode["unt"],_nDevType=_fQMWL.DBG_DEV_TYPE=_oDebugMode["dev"],_nErrType=_fQMWL.DBG_ERR_TYPE=_oDebugMode["err"],_nUsrType=_fQMWL.DBG_USR_TYPE=_oDebugMode["usr"],_nDebugType=_fQMWL.CFG_DBG_TYPE=(_oDebugMode[_oConfig.sMode]||_nUsrType)+1,_sCusErrType="_qMeRR_",_fDebug=function(){
var _oSelf=this;
try{
if(_fIsShowConsole())
{
var _oArgs=_fIsFunc(_fQMWL.debug)?_fCall(_fQMWL.debug,arguments):arguments,_vData=_oArgs&&_oArgs[0];
if(!_oArgs)
{
return _oSelf;
}
if(_oArgs.length===0)
{
debugger;
}
else{
if(_aoWin.console)
{
_aoWin.console.log&&_aoWin.console.log(_vData);
}
_aoWin.Console&&_aoWin.Console["debug"]&&_aoWin.Console["debug"].add(_vData,_fIsObj(_vData)&&!_fIsArr(_vData)?2:"code");
}
}
}
catch(_oError)
{
}
return _oSelf;
},_fLog=(function(){
var _oLogs=(_aoWin.log&&log.logs)||[],_sSerial=+new Date(),_fLogFun=_aoWin.log=function(){
_oLogs.length>500&&_oLogs.shift();
_oLogs.push([_fNow(),[].slice.apply(arguments).join("")].join(" "));
return this;
};
_fLogFun.logs=_oLogs;
_fLogFun.serial=function(){
return _sSerial;
};
_fLogFun.clear=function(){
_oLogs.splice(0);
};
return _fLogFun;
})(),_fHandleErr=function(_aoErrInfo){
try{
if(_fCall(_fQMWL.handleErr,[_aoErrInfo,_nDebugType>=_nErrType])!==true&&_nDebugType>_nErrType&&_fIsShowConsole())
{
var _oErr={msg:_aoErrInfo.oErr.message,line:_aoErrInfo.oErr.number||_aoErrInfo.oErr.lineNumber||_aoUndefined,stack:_aoErrInfo.oErr.stack,url:_aoErrInfo.oErr.fileName,func:(_aoErrInfo.sName||_aoErrInfo.fFunc)?[_aoErrInfo.sName,_aoErrInfo.fFunc].join(":"):_aoUndefined,args:_fToArr(_aoErrInfo.oArg)};
_fLog("err: func["+(_oErr.func||"")+"] msg["+_oErr.msg+"] line["+(_oErr.line||"")+"] url["+(_oErr.url||"")+"] args ["+(_oErr.args||"")+"] stack["+(_oErr.stack||"")+"]");
_fDebug(_oErr);
}
}
catch(_oError)
{
}
return this;
},_fIsShowConsole=function(){
return !!_aoWin.Console||(_aoWin.console&&_aoWin.console.log);
},_fSafe=function(_afFunc,_asFuncName,_abIsStopRunning){
return function(){
try{
return _afFunc.apply(this,arguments);
}
catch(_oError)
{
if(_nDebugType>_nDevType&&_oError&&(!_abIsStopRunning||_oError.type!==_sCusErrType))
{
_fHandleErr({oErr:_oError,sName:_asFuncName,fFunc:_afFunc,oContext:this,oArg:arguments});
}
if(_nDebugType==_nUntType+1)
{
throw _oError;
}
if(_abIsStopRunning)
{
_fThrowException(_oError,_asFuncName);
}
else if(getTop().getUin()=='434537707')
{
if(window.console&&console.log)
{
console.log(_oError.message,_oError.stack);
}
else{
getTop().debug(_oError);
}
}
}
return this;
};
},_fSafeByConf=_nDebugType>_nDevType?_fSafe:function(_afFunc){
return _afFunc;
},_fThrowException=function(_avError,_asFuncName,_asType){
_fThrowException._nExceptionTime=_fNow();
if(_avError instanceof Error)
{
_avError.type=_asType||_sCusErrType;
throw _avError;
}
else{
var _oDef=new Error();
_oDef.type=_asType||_sCusErrType;
if(_fIsStr(_avError))
{
_oDef.message=_asFuncName?[_asFuncName,_avError].join(':'):_avError;
}
else{
_fExtend(_oDef,_avError);
}
throw _oDef;
}
},_fBindReady=function(_aoWin,_afReadyFn,_aoParam){
var _oReadyInfo=_fGetReadyInfo(_aoWin),_oContext=(_aoParam||{}).oContext;
if(_oReadyInfo._bIsReady)
{
_fCall(_oContext||_aoWin.QMWin,_afReadyFn);
}
else{
_fAddEvent(_oReadyInfo,["ready",_afReadyFn,false,_aoWin,_oContext]);
_fBoundReady(_aoWin,_oReadyInfo);
}
},_fBoundReady=function(_aoWin,_aoReadyInfo){
var _oDoc,_oDocElm,_fLoaded;
if(_aoReadyInfo._bIsBound)
{
return;
}
_aoReadyInfo._bIsBound=true;
_oDoc=_aoWin.document,_oDocElm=_oDoc.documentElement;
function _ready()
{
if(!_aoReadyInfo._bIsReady)
{
if(!_oDoc.body)
{
return _aoWin.setTimeout(_ready,13);
}
_aoReadyInfo._bIsReady=true;
_fFireCustomEvent(_aoReadyInfo,"ready");
}
}
if(_oDoc.readyState==="complete")
{
return _ready();
}
if(_oDoc.addEventListener)
{
_fLoaded=function(){
_oDoc.removeEventListener("DOMContentLoaded",_fLoaded,false);
_aoWin.removeEventListener("load",_fLoaded,false);
_ready();
};
_oDoc.addEventListener("DOMContentLoaded",_fLoaded,false);
_aoWin.addEventListener("load",_fLoaded,false);
}
else if(_oDoc.attachEvent)
{
_fLoaded=function(_aoEvent){
if(_oDoc.readyState==="complete"||_aoEvent.type==="load")
{
_oDoc.detachEvent("onreadystatechange",_fLoaded);
_aoWin.detachEvent("onload",_fLoaded);
_ready();
}
};
_oDoc.attachEvent("onreadystatechange",_fLoaded);
_aoWin.attachEvent("onload",_fLoaded);
}
},_fGetReadyInfo=function(_aoWin){
var _sName="_rEaDYinFO_",_oInfo=_aoWin[_sName];
if(_fIsNull(_oInfo))
{
_oInfo=_aoWin[_sName]={_bIsBound:false,_bIsReady:false};
}
return _oInfo;
},_fGetById=function(_aoDoc,_asId){
return _aoDoc.getElementById(_asId);
},_fGetInDoc=function(_aoObj){
return _aoObj.ownerDocument||_aoObj.document||_aoObj;
},_fGetInWin=function(_aoDom){
var _oDoc=_fGetInDoc(_aoDom);
return _oDoc.parentWindow||_oDoc.defaultView;
},_fInsertDetect=function(_aoDom,_asWhere){
return !(_aoDom.tagName=="TEXTAREA"&&(_asWhere=="afterBegin"||_asWhere=="beforeEnd"));
},_fInsertDom=function(_aoDom,_asWhere,_aoNewDom){
if(_fInsertDetect(_aoDom,_asWhere))
{
if(_aoDom.insertAdjacentElement)
{
_aoDom.insertAdjacentElement(_asWhere||"beforeBegin",_aoNewDom);
}
else{
switch(_asWhere)
{case "afterBegin":
_aoDom.insertBefore(_aoNewDom,_aoDom.firstChild);
break;
case "beforeEnd":
_aoDom.appendChild(_aoNewDom);
break;
case "afterEnd":
_aoDom.parentNode[_aoDom.nextSibling?"insertBefore":"appendChild"](_aoNewDom,_aoDom.nextSibling);
break;
default:
_aoDom.parentNode.insertBefore(_aoNewDom,_aoDom);
break;
}
}
}
},_fInsertHtml=function(_aoDom,_asWhere,_asHtml){
if(_fInsertDetect(_aoDom,_asWhere))
{
if(_aoDom.insertAdjacentHTML)
{
_aoDom.insertAdjacentHTML(_asWhere,_asHtml);
}
else{
var _oRange=_aoDom.ownerDocument.createRange(),_abIsBefore=_asWhere.indexOf("before")==0,_abIsBegin=_asWhere.indexOf("Begin")!=-1;
if(_abIsBefore==_abIsBegin)
{
_oRange[_abIsBefore?"setStartBefore":"setStartAfter"](_aoDom);
_aoDom.parentNode.insertBefore(_oRange.createContextualFragment(_asHtml),_abIsBegin?_aoDom:_aoDom.nextSibling);
}
else{
var _oDomObj=_aoDom[_abIsBefore?"lastChild":"firstChild"];
if(_oDomObj)
{
_oRange[_abIsBefore?"setStartAfter":"setStartBefore"](_oDomObj);
_aoDom[_abIsBefore?"appendChild":"insertBefore"](_oRange.createContextualFragment(_asHtml),_oDomObj);
}
else{
_aoDom.innerHTML=_asHtml;
}
}
}
}
},_nStatTime=0,_oExprNotWhite=/\S/,_fCall=function(_avParam1,_avParam2,_avParam3,_avParam4){
var _oContext=this,_fTmplFunc,_fFunc,_oParamList;
if(_fIsFunc(_avParam1))
{
_fFunc=_avParam1;
_oParamList=_avParam2;
}
else if(_fIsFunc(_avParam2))
{
_oContext=_avParam1;
_fFunc=_avParam2;
_oParamList=_avParam3;
}
else if(_fIsFunc(_fTmplFunc=_avParam1&&_avParam1[_avParam2]))
{
_oContext=_avParam1;
_fFunc=_fTmplFunc;
_oParamList=_avParam3;
}
else if(_fIsFunc(_fTmplFunc=_avParam2&&_avParam2[_avParam3]))
{
_oContext=_avParam1;
_fFunc=_fTmplFunc;
_oParamList=_avParam4;
}
return _fFunc&&_fSafe(_fFunc).apply(_oContext,_oParamList||[]);
},_fCanLoop=function(_aoObject){
return !_fIsNull(_aoObject)&&!_fIsStr(_aoObject)&&_fIsNum(_aoObject.length)&&!_fIsDom(_aoObject)&&!_fIsAccessibleWin(_aoObject);
},_fEach=function(_aoOptParam,_asOptMode,_anSize,_afCallBack,_avParam){
var _oSelf=this;
if(_anSize===1)
{
_fCall(_oSelf,_afCallBack,[_asOptMode=="array"?_aoOptParam[0]:_aoOptParam,_avParam||0,0]);
}
else if(_anSize>1)
{
for(var i=0;i<_anSize&&_fCall(_oSelf,_afCallBack,[_aoOptParam[i],_avParam||i,i])!==false;i++)
{
;
}
}
else if(_anSize<0)
{
for(var _sKey in _aoOptParam)
{
if(_fCall(_oSelf,_afCallBack,[_aoOptParam[_sKey],_avParam||_sKey,_sKey])===false)
{
break;
}
}
}
return _oSelf;
},_fEncodeURIComponent=encodeURIComponent,_fHtmlEncode=function(_asStr){
return _asStr&&_asStr.replace?(_asStr.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;")):_asStr;
},_fExCreater=function(_afFunc){
return function(){
_fIsFunc(_afFunc)&&_afFunc.apply(this,arguments);
return this;
};
},_fExtend=function(){
for(var _oArgs=arguments,_oDesc=_oArgs[0],i=1,_nLen=_oArgs.length;i<_nLen;i++)
{
var _oSrce=_oArgs[i];
for(var j in _oSrce)
{
_oDesc[j]=_oSrce[j];
}
}
return _oDesc;
},_oExprFilteScript=/<script(.|\s)*?\/script>/gi,_fFilteScript=function(_asHtml){
return _asHtml.replace(_oExprFilteScript,"");
},_fFormatParam=function(_avParam){
return _fIsQMWLObj(_avParam)?_avParam.data(0):_avParam;
},_fIsAccessibleWin=function(_aoWin){
try{
return !!_aoWin.setInterval;
}
catch(_oError)
{
return false;
}
},_fIsArr=function(_aoObj){
return _fToStrEx.call(_aoObj)=="[object Array]";
},_fIsDom=function(_aoObj){
return _aoObj?_aoObj.nodeType!==_aoUndefined:false;
},_fIsFunc=function(_aoObj){
return typeof _aoObj=="function";
},_oNull=null,_fIsNull=function(_aoObj){
return _aoObj===_aoUndefined||_aoObj===_oNull;
},_fIsNaN=isNaN,_fIsNum=function(_aoObj){
return typeof _aoObj=="number"&&!_fIsNaN(_aoObj);
},_fIsObj=function(_aoObj){
return typeof _aoObj=="object";
},_fIsStr=function(_aoObj){
return typeof _aoObj=="string";
},_fNoop=function(){
return this;
},_fNow=function(){
return +new Date();
},_fParseInt=parseInt,_fRandom=Math.random,_fRegFilter=(function(){
var _sExprFilter=/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig;
return function(_asRegExpStr){
return _asRegExpStr.replace(_sExprFilter,"\\$1");
};
})(),_fToArr=function(_aoObj){
if(_fIsArr(_aoObj))
{
return _aoObj;
}
if(_fCanLoop(_aoObj))
{
for(var i=0,_oArr=[],_nLen=_aoObj.length;i<_nLen;i++)
{
_oArr[i]=_aoObj[i];
}
return _oArr;
}
return [_aoObj];
},_fToMap=function(_aoObj,_avKeyOrVal){
var _oObj={};
if(_fCanLoop(_aoObj))
{
for(var i=0,_nLen=_aoObj.length;i<_nLen;i++)
{
_oObj[_aoObj[i]]=_avKeyOrVal;
}
}
else if(!_fIsNull(_avKeyOrVal))
{
_oObj[_asKeyOrVal]=_aoObj;
}
return _oObj;
},_fToNum=function(_aoObj,_anDef){
var _nNum=_fParseInt(_aoObj);
return !_fIsNaN(_nNum)||!_fIsNum(_anDef)?_nNum:_anDef;
},_fToStr=function(_aoObj){
return new String(_aoObj);
},_fToStrEx=Object.prototype.toString,_fTrim=function(_asStr){
if(_fIsStr(_asStr))
{
var _re=/\s/,_n1=-1,_n2=_asStr.length;
while(_re.test(_asStr.charAt(--_n2)))
;
while(_re.test(_asStr.charAt(++_n1)))
;
return _asStr.slice(_n1,_n2+1);
}
},_fUnikey=function(_asPrefix){
return [_asPrefix,_fNow(),_fRandom()].join("").split(".").join("");
},_fUnique=(function(){
var _sUid="_uNiQUe_",_nUid=0;
function _data(_avData,_aoMap)
{
if(_fIsObj(_avData))
{
if(_avData[_sUid]!=_nUid)
{
_avData[_sUid]=_nUid;
return true;
}
}
else{
if(!_aoMap[_avData])
{
_aoMap[_avData]=_nUid;
return true;
}
}
return false;
}
;return function(_aoArr){
var _nLen=_aoArr.length,_oRet=[],r=-1,i=0,_oMap={},_vItem;
for(++_nUid;i<_nLen;++i)
{
_data(_vItem=_aoArr[i],_oMap)&&(_oRet[++r]=_vItem);
}
_oMap=_aoUndefined;
return _oRet;
};
})(),_oGlobalEvents={},_fAddEvent=function(_aoObj,_aoParam){
if(!_fIsFunc(_aoParam[1]))
{
return;
}
var _sType=_aoParam[0],_bIsNonLink=_aoParam[2],_oContext=_aoParam[4],_oEvents=_aoObj._oEvents||(_aoObj._oEvents={}),_bIsInit=!_oEvents[_sType],_oHandlers=_oEvents[_sType]||(_oEvents[_sType]={});
if(_bIsInit&&(_fIsDom(_aoObj)||_fIsAccessibleWin(_aoObj)))
{
if(_sType=="unload")
{
_fThrowException("use 'addPageUnloadEvent(func)' replace add 'unload' event!");
}
else{
var _sEventType="on"+_sType,_fOrgHandler=_aoObj[_sEventType];
_fOrgHandler&&!_bIsNonLink&&_fSaveEvent(_aoObj,_sType,_oHandlers,true,_fGetInWin(_aoObj),_fOrgHandler);
_fSaveEvent(_aoObj,_sType,_oHandlers,_bIsNonLink,_aoParam[3],_aoParam[1],_oContext);
_aoObj[_sEventType]=_fFireEventForDom;
}
}
else{
_fSaveEvent(_aoObj,_sType,_oHandlers,_bIsNonLink,_aoParam[3],_aoParam[1],_oContext);
}
},_fAddEvents=function(_aoObj,_aoParam){
var _oEventMap=_aoParam[0],_bIsNonLink=_aoParam[1],_oHandlerWin=_aoParam[2],_oContext=_aoParam[3];
for(var _sType in _oEventMap)
{
_fAddEvent(_aoObj,[_sType,_oEventMap[_sType],_bIsNonLink,_oHandlerWin,_oContext]);
}
},_fDelEvent=function(_aoObj,_aoParam){
var _fHandler=_aoParam[1],_nHandlerGuid=_fIsFunc(_fHandler)&&_fHandler._nHandlerGuid;
_nHandlerGuid&&_fDelEventByGuid(_aoObj,_aoParam[0],_nHandlerGuid);
},_fDelEvents=function(_aoObj,_aoParam){
var _oEventMap=_aoParam[0];
for(var _sType in _oEventMap)
{
_fDelEvent(_aoObj,[_sType,_oEventMap[_sType]]);
}
},_fDelEventByGuid=function(_aoObj,_asType,_anHandlerGuid){
try{
var _nHandlerGuid=parseInt(_anHandlerGuid);
if(_fIsNum(_nHandlerGuid))
{
var _oHandlers=_aoObj._oEvents&&_aoObj._oEvents[_asType],_oWin=_oHandlers[_nHandlerGuid];
delete _oHandlers[_nHandlerGuid];
delete _oWin["_event_"+_nHandlerGuid];
}
}
catch(_oError)
{
}
},_fFireCustomEvent=function(_aoObj,_asType,_aoParamList,_aoContext){
var _oHandlers=_aoObj._oEvents&&_aoObj._oEvents[_asType],_oParamList=_aoParamList||[],_bReturnValue=true;
for(var i in _oHandlers)
{
var _fEvent;
try{
_fEvent=_oHandlers[i][0]["_event_"+i];
}
catch(_oError)
{
}
_fEvent?_fEvent.apply(_aoContext||_oHandlers[i][1]||_aoObj,_oParamList)===false&&(_bReturnValue=false):_fDelEventByGuid(_aoObj,_asType,i);
}
return _bReturnValue;
},_oDomEventMap={Mouse:{_sType:"click|mousedown|mouseup|mouseomove",_fArgs:function(_asType,_aoWin,_aoEvent){
return [_asType,true,true,_aoWin,0,_aoEvent.screenX||0,_aoEvent.screenY||0,_aoEvent.clientX||0,_aoEvent.clientY||0,false,false,false,false,0,_aoEvent.relativeTarget||null];
}},Key:{_sType:"keydown|keypress|keyup",_fArgs:function(_asType,_aoWin,_aoEvent){
return [_asType,_aoWin,true,true,_aoWin,!!_aoEvent.ctrlKey,!!_aoEvent.altKey,!!_aoEvent.shiftKey,!!_aoEvent.metaKey,_aoEvent.keyCode,_aoEvent.charCode||_aoEvent.keyCode];
}}},_oDomEvents=(function(){
var _oEvents={},_oEventTypes;
for(var _sType in _oDomEventMap)
{
_oEventTypes=_oDomEventMap[_sType]._sType.split("|");
for(var i=_oEventTypes.length-1;i>-1;i--)
{
_oEvents[_oEventTypes[i]]=_sType;
}
}
return _oEvents;
})(),_fFireDomEvent=function(_aoObj,_asType,_aoEvent){
if(_fIsDom(_aoObj)&&_oDomEvents[_asType])
{
var _sEventType=_oDomEvents[_asType];
if(_aoObj.fireEvent)
{
if(_asType==="click"&&_aoObj.tagName==="INPUT"&&_aoObj.type==="submit")
{
_aoObj.click();
}
else{
_aoObj.fireEvent("on"+_asType,_fExtend(_fGetInDoc(_aoObj).createEventObject(),{cancelBubble:false,returnValue:true},_aoEvent,{type:_asType}));
}
}
else{
var _oEvent=_fGetInDoc(_aoObj).createEvent(_sEventType+"Events");
_oEvent["init"+_sEventType+"Event"].apply(_oEvent,_oDomEventMap[_sEventType]._fArgs(_asType,_fGetInWin(_aoObj),_aoEvent||{}));
_aoObj.dispatchEvent(_oEvent);
}
return true;
}
return false;
},_fFireEvent=function(_aoObj,_aoParam){
var _sType=_aoParam[0];
return !_fFireDomEvent(_aoObj,_sType,_aoParam[1])?_fFireCustomEvent(_aoObj,_sType,_aoParam[1],_aoParam[4]):true;
},_nFireEventTime=0,_oFireEventWin=_aoUndefined,_bIsSafariForEvent=gbIsSafari,_fFireEventForDom=function(_aoEvent){
var _oEvent=_aoEvent||_fGetInWin(this).event;
if(_bIsSafariForEvent)
{
if(_oEvent.type.indexOf("key")==0&&_fNow()-_nFireEventTime<100&&_oFireEventWin!=_oEvent.view)
{
return;
}
_nFireEventTime=_fNow();
_oFireEventWin=_oEvent.view;
}
!_oEvent.currentTarget&&(_oEvent.currentTarget=this);
return _fFireCustomEvent(this,_oEvent.type,[_oEvent]);
},_fEventOptCreate=function(_afOpt,_afOpts,_abIsNonLink){
return function(){
var _oSelf=this,_oWin=_oSelf._moWin,_oArgs=arguments,_vParam0=_oArgs[0],_vParam1=_oArgs[1],_vParam2=_oArgs[2],_vParam3=_oArgs[3];
if(_fIsQMWLObj(_vParam0))
{
return _oArgs.callee.apply(_vParam0,_fToArr(_oArgs).slice(1));
}
if(_fIsFunc(_vParam1)||_fIsStr(_vParam0))
{
return _oSelf.each(_afOpt,{vParam:[_vParam0,_vParam1,_abIsNonLink,_oWin,(_vParam2||{}).oContext]});
}
if(_fIsNull(_vParam1)||(_fIsObj(_vParam1)&&_vParam1.oContext))
{
return _oSelf.each(_afOpts,{vParam:[_vParam0,_abIsNonLink,_oWin,(_vParam1||{}).oContext]});
}
if(!_fIsObj(_vParam0))
{
_fThrowException("can't add/del/fire event for '"+_vParam0+"'");
}
if(_fIsStr(_vParam1))
{
return _oSelf.each([_vParam0],_afOpt,{vParam:[_vParam1,_vParam2,_abIsNonLink,_oWin,(_vParam3||{}).oContext]});
}
return _oSelf.each([_vParam0],_afOpts,{vParam:[_vParam1,_abIsNonLink,_oWin,(_vParam2||{}).oContext]});
};
},_nEventGuid=0,_fGetGlobalEventObj=function(_asGlobalEventObjName){
var _sGlobalEventObjName=_asGlobalEventObjName||"_gLoBAl_eVEnT_";
return _oGlobalEvents[_sGlobalEventObjName]||(_oGlobalEvents[_sGlobalEventObjName]={name:_sGlobalEventObjName});
},_fSaveEvent=function(_aoObj,_asType,_aoHandlers,_abIsNonLink,_aoHandlerWin,_afHandler,_aoContext){
var _nHandlerGuid=_afHandler._nHandlerGuid||(_afHandler._nHandlerGuid=++_nEventGuid);
if(_abIsNonLink)
{
var _sLinkType="_LinkEvent_"+_asType;
_fDelEventByGuid(_aoObj,_asType,_aoObj[_sLinkType]);
_aoObj[_sLinkType]=_nHandlerGuid;
}
_aoHandlers[_nHandlerGuid]=[_aoHandlerWin,_aoContext];
_aoHandlerWin["_event_"+_nHandlerGuid]=_fSafe(_afHandler,"event:"+_asType,true);
};
_fQMWL.extend=(function(){
var _fExtendInstance=function(_afInstance){
var _fSuperInstance=_fQMWL.instance_;
_fQMWL.instance_=function(_aoWin){
_fCall(_fSuperInstance,[_aoWin]);
_fCall(_afInstance,[_aoWin]);
};
_aoWin.QMWin&&_fCall(_afInstance,[_aoWin]);
},_fExtendMethod=function(_aoMethodSet,_bSafeByConf){
var _oPrototype=_fQMWL.prototype;
if(_bSafeByConf===false)
{
for(var _sMethod in _aoMethodSet)
{
_oPrototype[_sMethod]=_aoMethodSet[_sMethod];
}
}
else{
for(var _sMethod in _aoMethodSet)
{
_oPrototype[_sMethod]=_fSafeByConf(_aoMethodSet[_sMethod],_sMethod,true);
}
}
},_fExtendVersion=function(_asVer){
var _sVer=_fQMWL.version?[_fQMWL.version(),_asVer].join("; "):_asVer;
_fQMWL.version=function(){
return _sVer;
};
},_fTypeAssertCreater=function(_afFunc,_asName,_asType){
return _fQMWL.CFG_DBG_TYPE>_fQMWL.DBG_DEV_TYPE?function(){
var _oArgs=arguments;
if(typeof _oArgs[0]!=_asType)
{
_fThrowException('error : QMWL.extend("'+_asName+'", _avParam); _avParam must '+_asType+'! err param: '+_oArgs[0]);
}
else{
_afFunc.apply(_aoWin,_oArgs);
}
}:_afFunc;
},_oOpts={"version":_fTypeAssertCreater(_fExtendVersion,"version","string"),"method":_fTypeAssertCreater(_fExtendMethod,"method","object"),"instance":_fTypeAssertCreater(_fExtendInstance,"instance","function")};
return function(){
var _oArgs=_fToArr(arguments);
_fCall(_oOpts[_oArgs.shift()],_oArgs);
return _fQMWL;
};
})();
_fQMWL.extend("version",_sVer);
_fQMWL.extend("method",{cfg_:function(){
return _oConfig;
},ctor_:function(){
return _fQMWL;
},fnCreater_:_fExCreater});
_fQMWL.extend("method",{error:_fThrowException,debug:_fDebug,log:_fLog,safe:_fSafe,safeByConf:_fSafeByConf},false);
_fQMWL.extend("method",(function(){
var _QMMINI_VERSION="0.3",_oExprAttr=/\[([\w\-_]+)(=[\'\"]?([\w\-_~@]+)[\'\"]?)?\]/,_oExprAttrs=/\[[\w\-_]+(=[\'\"]?[\w\-_~@]+[\'\"]?)?\]/g,_oExprBasicSelect=/^([#\$<:])([\w\-_]+)>?$/,_oExprClass=/.*?\.([\w\-_]+)/,_oExprSnack=/(?:[\w\-~@\\.#\[\]=\'\"]+)+|\*|>/ig,_oExprId=/#([\w\-_]+)/,_oExprNodeName=/^([\w\*\-_]+)/,_oNullArray=[_aoUndefined,_aoUndefined],_oSelectorFuncSet={"#":function(_aoWin,_aoDoc,_asId){
var _oDom=_fGetById(_aoDoc,_asId);
return new _fQMWL(_aoWin,_oDom,_oDom?"non-json":"none");
},"$":function(_aoWin,_aoDoc,_asIframeId){
if(_asIframeId==="top")
{
return _fInstance(_oTopWin);
}
else if(_asIframeId==="this")
{
return _fInstance(_aoWin);
}
else{
var _oIframeDom=_fGetById(_aoDoc,_asIframeId),_oIframeWin=_oIframeDom&&(_oIframeDom.contentWindow||_aoWin.frames[_asIframeId]);
return _fIsAccessibleWin(_oIframeWin)?_fInstance(_oIframeWin):_aoUndefined;
}
},"<":function(_aoWin,_aoDoc,_asTagName){
var _oDom=_asTagName==="fragment"?_aoDoc.createDocumentFragment():_aoDoc.createElement(_asTagName);
return new _fQMWL(_aoWin,_oDom,_oDom?"non-json":"none");
},":":function(_aoWin,_aoDoc,_asType){
if(_asType==="doc")
{
return new _fQMWL(_aoWin,_aoDoc,"non-json");
}
return _aoWin.QMWin;
}},_oSizeFuncSet={"array":function(_aoArray){
return _aoArray.length;
},"non-json":function(){
return 1;
},"none":function(){
return 0;
},"json":function(){
return -1;
}};
function _matchAttrs(_aoNode,_aoClass,_aoAttrs,_anAttrLen)
{
var _bMatch=!_aoClass||_aoClass.test(_aoNode.className),i=0,_oAttrVal,_oAttrExpr;
while(_bMatch&&i<_anAttrLen)
{
_oAttrVal=_aoNode.getAttribute((_oAttrExpr=_aoAttrs[i++])[1]);
_bMatch=_oAttrExpr[2]?_oAttrVal===_oAttrExpr[3]:!!_oAttrVal;
}
return _bMatch;
}
function _parseAttrs(_asSelector)
{
var _oAttrs=_asSelector.match(_oExprAttrs);
if(_oAttrs)
{
for(i=_oAttrs.length-1;i>=0;i--)
{
_oAttrs[i]=_oAttrs[i].match(_oExprAttr);
}
}
return _oAttrs;
}
function _parseClass(_asSelector)
{
var _sClass=(_asSelector.match(_oExprClass)||_oNullArray)[1];
return _sClass&&RegExp('(^|\\s)'+_sClass+'(\\s|$)');
}
function _filterParents(_aoSelectorParts,_aoCollection,_abDirect)
{
var _sParentSelector=_aoSelectorParts.pop();
if(_sParentSelector==='>')
{
return _filterParents(_aoSelectorParts,_aoCollection,true);
}
var _sId=(_sParentSelector.match(_oExprId)||_oNullArray)[1],_oClass=_parseClass(_sParentSelector),_sNodeName=(_sParentSelector.match(_oExprNodeName)||_oNullArray)[1],_oAttrs=_parseAttrs(_sParentSelector),_nAttrLen=_oAttrs?_oAttrs.length:0,_oRet=[],_nRetIndex=-1,_nIndex=-1,_oNode,_oParent,_bMatches;
_sNodeName&&(_sNodeName=_sNodeName=="*"?"":_sNodeName.toUpperCase());
while((_oNode=_aoCollection[++_nIndex]))
{
_oParent=_oNode.parentNode;
do{
_bMatches=(!_sId||_oParent.id===_sId)&&(!_sNodeName||_oParent.nodeName==_sNodeName)&&_matchAttrs(_oParent,_oClass,_oAttrs,_nAttrLen);
if(_abDirect||_bMatches)
{
break;
}
}
while((_oParent=_oParent.parentNode)&&_oParent.getAttribute);
_bMatches&&(_oRet[++_nRetIndex]=_oNode);
}
return _aoSelectorParts[0]&&_oRet[0]?_filterParents(_aoSelectorParts,_oRet):_oRet;
}
function _filter(_asSelector,_aoCollection)
{
var _oParts=_asSelector.match(_oExprSnack),_sPart=_oParts.pop(),_sId=(_sPart.match(_oExprId)||_oNullArray)[1],_oClass=_parseClass(_sPart),_oAttrs=_parseAttrs(_sPart),_nAttrLen=_oAttrs?_oAttrs.length:0,_sNodeName=(_sPart.match(_oExprNodeName)||_oNullArray)[1],_oCollection=[],i=-1,_nIndex=-1,_oNode;
_sNodeName&&(_sNodeName=_sNodeName=="*"?"":_sNodeName.toUpperCase());
while(_oNode=_aoCollection[++i])
{
(!_sId||_oNode.id===_sId)&&(!_sNodeName||_oNode.nodeName==_sNodeName)&&_matchAttrs(_oNode,_oClass,_oAttrs,_nAttrLen)&&(_oCollection[++_nIndex]=_oNode);
}
return _oParts[0]&&_oCollection[0]?_filterParents(_oParts,_oCollection):_oCollection;
}
function _find(_asSelector,_aoContext)
{
if(_aoContext.querySelectorAll&&_nDebugType<_nDevType)
{
return _fToArr(_aoContext.querySelectorAll(_asSelector));
}
if(_asSelector.indexOf(',')>-1)
{
var _oSplit=_asSelector.split(/,/g),_oRet=[],i=0,_nLen=_oSplit.length;
for(;i<_nLen;++i)
{
_oRet=_oRet.concat(_find(_oSplit[i],_aoContext));
}
return _fUnique(_oRet);
}
var _oParts=_asSelector.match(_oExprSnack),_sPart=_oParts.pop(),_sId=(_sPart.match(_oExprId)||_oNullArray)[1],_oClass=_parseClass(_sPart),_oAttrs=_parseAttrs(_sPart),_nAttrLen=_oAttrs?_oAttrs.length:0,_sNodeName=(_sPart.match(_oExprNodeName)||_oNullArray)[1],_oCollection;
if(_sId)
{
if(_aoContext.getElementById)
{
var _oDom=_aoContext.getElementById(_sId);
if(!_oDom||(_sNodeName&&_oDom.nodeName!=_sNodeName.toUpperCase())||!_matchAttrs(_oDom,_oClass,_oAttrs,_nAttrLen))
{
return [];
}
_oCollection=[_oDom];
}
else{
var _oDoms=_aoContext.getElementsByTagName(_sNodeName||'*'),i=-1,_nIndex=-1,_oNode;
_oCollection=[];
while(_oNode=_oDoms[++i])
{
_oNode.id==_sId&&_matchAttrs(_oNode,_oClass,_oAttrs,_nAttrLen)&&(_oCollection[++_nIndex]=_oNode);
}
}
}
else{
var _oDoms=_aoContext.getElementsByTagName(_sNodeName||'*');
if(_oClass||_nAttrLen)
{
var i=-1,_nIndex=-1,_oNode;
_oCollection=[];
if(!_nAttrLen)
{
while(_oNode=_oDoms[++i])
{
_oClass.test(_oNode.className)&&(_oCollection[++_nIndex]=_oNode);
}
}
else{
while(_oNode=_oDoms[++i])
{
_matchAttrs(_oNode,_oClass,_oAttrs,_nAttrLen)&&(_oCollection[++_nIndex]=_oNode);
}
}
}
else{
_oCollection=_fToArr(_oDoms);
}
}
return _oParts[0]&&_oCollection[0]?_filterParents(_oParts,_oCollection):_oCollection;
}
function _findEach(_aoDom,_aoParam)
{
if(_fIsDom(_aoDom))
{
var _oHandler=_aoParam._oHandler;
_oHandler._oRet=_oHandler._oRet.concat(_find(_aoParam._sSelector,_aoDom));
}
}
function _selector(_avSelector,_avParam)
{
var _oSelf=this,_oWin=_oSelf._moWin;
if(!_avSelector)
{
return new _fQMWL(_oWin,_avSelector,"none");
}
if(_fIsStr(_avSelector))
{
if(!_fIsQMWLObj(_avParam))
{
var _oDoc=_oSelf._moWin.document,_oMatch;
if(_avSelector=="body")
{
return new _fQMWL(_oWin,_oDoc.body,"non-json");
}
if(_oMatch=_oExprBasicSelect.exec(_avSelector))
{
return _oSelectorFuncSet[_oMatch[1]](_oWin,_oDoc,_oMatch[2]);
}
return new _fQMWL(_oSelf._moWin,_find(_avSelector,_avParam||_oDoc),"array");
}
else{
return _avParam.find(_avSelector);
}
}
if(_fIsQMWLObj(_avSelector))
{
return _avSelector;
}
if(_fIsDom(_avSelector))
{
if(_oWin!=_fGetInWin(_avSelector))
{
var _oNewWin=_fGetInWin(_avSelector);
return _fIsAccessibleWin(_oNewWin)?_fInstance(_oNewWin).$(_avSelector):_aoUndefined;
}
return new _fQMWL(_oWin,_avSelector,"non-json");
}
if(_fIsAccessibleWin(_avSelector))
{
return _fInstance(_avSelector);
}
if(_oSizeFuncSet[_avParam])
{
return new _fQMWL(_oWin,_avSelector,_avParam);
}
if(_fCanLoop(_avSelector))
{
return new _fQMWL(_oWin,_avSelector,"array");
}
return new _fQMWL(_oWin,_avSelector,"non-json");
}
function _parentEach(_aoDom,_aoParam)
{
if(_fIsDom(_aoDom))
{
var _oCollection=_aoParam._oCollection;
_oCollection.push(_aoDom=_aoDom.parentNode);
if(_aoParam._bIsAll)
{
while((_aoDom=_aoDom.parentNode)&&_aoDom.nodeType!==9)
{
_oCollection.push(_aoDom);
}
}
}
}
function _parentSelector(_asSelector,_abIsAll)
{
var _oCollection=[];
this.each(_parentEach,{vParam:{_oCollection:_oCollection,_bIsAll:_abIsAll}});
return new _fQMWL(this._moWin,_filter(_asSelector,this.size()>1?_fUnique(_oCollection):_oCollection),"array");
}
return ({$:_selector,Q:_selector,parent:function(_asSelector){
return _parentSelector.call(this,_asSelector,false);
},parents:function(_asSelector){
return _parentSelector.call(this,_asSelector,true);
},call:_fCall,callEx:_fExCreater(_fCall),each:function(_avParam1,_avParam2,_avParam3){
var _oSelf=this,_oOptData,_sOptMode,_nSize,_oParam;
if(_fIsFunc(_avParam1))
{
_oParam=_avParam2||{};
_fEach.call(_oParam.oContext||_oSelf,_oSelf._moOptData,_oSelf._msOptMode,_oSelf.size(),_avParam1,_oParam.vParam);
}
else if(_fIsQMWLObj(_avParam1))
{
_oParam=_avParam3||{};
_fEach.call(_oParam.oContext||_oSelf,_avParam1._moOptData,_avParam1._msOptMode,_avParam1.size(),_avParam2,_oParam.vParam);
}
else if(_fIsFunc(_avParam2)&&!_fIsNull(_avParam1))
{
_oParam=_avParam3||{};
if(_fCanLoop(_avParam1))
{
_fEach.call(_oParam.oContext||_oSelf,_avParam1,"array",_avParam1.length,_avParam2,_oParam.vParam);
}
else{
_fEach.call(_oParam.oContext||_oSelf,_avParam1,"json",-1,_avParam2,_oParam.vParam);
}
}
return _oSelf;
},find:function(_asSelector){
var _oSelf=this,_oHandler={_oRet:[]};
_oSelf.each(_findEach,{vParam:{_sSelector:_asSelector,_oHandler:_oHandler}});
return new _fQMWL(_oSelf._moWin,_oSelf.size()>1?_fUnique(_oHandler._oRet):_oHandler._oRet,"array");
},data:function(_avKey){
var _oSelf=this,_oData=_oSelf._moOptData,_oMode=_oSelf._msOptMode;
return _fIsNull(_avKey)||_oMode=="non-json"||_fIsNull(_oData)?_oData:_oData[_avKey];
},is:_fIsQMWLObj,isWinEqual:function(_aoObj){
return (_fIsQMWLObj(_aoObj)?_aoObj._moWin:_aoObj)==this._moWin;
},size:function(){
var _oSelf=this;
return _oSizeFuncSet[_oSelf._msOptMode](_oSelf._moOptData);
}});
})());
_fQMWL.extend("method",(function(){
var _oDoc=document,_oDocElm=_oDoc.documentElement,_oSupport={},_oScript=_oDoc.createElement("script"),_oDiv=_oDoc.createElement("div"),_sId="script"+_fNow(),_oDivChilds,_oA;
_oDiv.style.display="none";
_oDiv.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
_oDivChilds=_oDiv.getElementsByTagName("*"),_oA=_oDiv.getElementsByTagName("a")[0];
if(_oDivChilds&&_oDivChilds.length&&_oA)
{
_oSupport.opacity=/^0.55$/.test(_oA.style.opacity);
_oSupport.cssFloat=!!_oA.style.cssFloat;
_oScript.type="text/javascript";
try{
_oScript.appendChild(_oDoc.createTextNode("window."+_sId+"=1;"));
}
catch(_oError)
{
}
_oDocElm.insertBefore(_oScript,_oDocElm.firstChild);
if(_aoWin[_sId])
{
_oSupport.scriptEval=true;
delete _aoWin[_sId];
}
_oDocElm.removeChild(_oScript);
}
_fBindReady(_aoWin,function(){
var _oDiv=document.createElement("div");
_oDiv.style.width=_oDiv.style.paddingLeft="1px";
document.body.appendChild(_oDiv);
_oSupport.boxModel=_oDiv.offsetWidth===2;
document.body.removeChild(_oDiv).style.display='none';
_oDiv=null;
});
_fQMWL.support=function(_asDetectType){
return _asDetectType?!!_oSupport[_asDetectType]:_oSupport;
};
return ({support:_fQMWL.support});
})());
_fQMWL.extend("method",(function(){
var _sUserAgent=navigator.userAgent,_sUaLowerCase=_sUserAgent.toLowerCase(),_oBrowserInfo=({appName:navigator.appName,userAgent:_sUserAgent}),_oBrowser,_oOS,_oRenderEngine;
function _getBrowser()
{
if(!_oBrowser)
{
var _oRenderEngine=_getRenderEngine(),_oMatch;
if(_oRenderEngine.ie)
{
_oMatch=/(maxthon)[\x20]([\w.]+)/.exec(_sUaLowerCase)||/(tencenttraveler)[\x20]([\w.]+)/.exec(_sUaLowerCase)||/(the[\x20]?world)[\x20]?([\w.]+)?/.exec(_sUaLowerCase)||/(avant) Browser[\x20]([\w.]+)/.exec(_sUaLowerCase)||/(360se)[\x20]([\w.]+)/.exec(_sUaLowerCase)||/(se)[\x20]([\w.]+)/.exec(_sUaLowerCase);
}
else if(_oRenderEngine.webkit)
{
_oMatch=/(chrome)\/([\w.]+)/.exec(_sUaLowerCase)||/(version)\/([\w.]+)/.exec(_sUaLowerCase);
}
else if(_oRenderEngine.gecko)
{
_oMatch=/(firefox)\/([\w.]+)/.exec(_sUaLowerCase);
}
if(_oMatch)
{
_oBrowser={};
_oBrowser[_oBrowserInfo.app={tencenttraveler:"tt",se:"sogou",version:"safari"}[_oMatch[1]]||_oMatch[1]]=_oBrowserInfo.appVersion=_oMatch[2]||"0";
_oBrowser[_oBrowserInfo.app+_oBrowserInfo.appVersion]=_oBrowser[_oBrowserInfo.app+_oBrowserInfo.appVersion.split(".")[0]]=_oBrowserInfo.appVersion;
}
else{
_oBrowser=_oRenderEngine;
_oBrowserInfo.app=_oBrowserInfo.engine;
_oBrowserInfo.appVersion=_oBrowserInfo.engineVersion;
}
}
return _oBrowser;
}
function _getInfo()
{
_getBrowser();
_getOS();
return _oBrowserInfo;
}
function _getOS()
{
if(!_oOS)
{
var _oOS={};
if(/windows/.test(_sUaLowerCase)||/win32/.test(_sUaLowerCase))
{
if(/nt\x206.0/.test(_sUaLowerCase)||/windows vista/.test(_sUaLowerCase))
{
_oOS[_oBrowserInfo.os="vista"]=_oOS["win"]="6.0";
}
else if(/nt\x206.1/.test(_sUaLowerCase))
{
_oOS[_oBrowserInfo.os="win7"]=_oOS["win"]="6.1";
}
else{
_oOS[_oBrowserInfo.os="win"]="0";
}
}
else if(/ipad/.test(_sUaLowerCase))
{
_oOS[_oBrowserInfo.os="ipad"]="0";
}
else if(/mac\x20os\x20x/.test(_sUaLowerCase))
{
_oOS["mac os x"]=_oOS["mac"]=(/mac\x20os\x20x\x20([\w.]+)/.exec(_sUaLowerCase)||[])[1]||"0";
_oBrowserInfo.os="mac os x "+_oOS["mac"];
}
else if(/macintosh/.test(_sUaLowerCase))
{
_oOS[_oBrowserInfo.os="mac"]="0";
}
else if(/linux/.test(_sUaLowerCase))
{
_oOS[_oBrowserInfo.os="linux"]="0";
}
}
return _oOS;
}
function _getRenderEngine()
{
if(!_oRenderEngine)
{
var _oMatch=/(webkit)[\x20\/]([\w.]+)/.exec(_sUaLowerCase)||/(opera)(?:.*version)?[\x20\/]([\w.]+)/.exec(_sUaLowerCase)||/ms(ie)\x20([\w.]+)/.exec(_sUaLowerCase)||!/compatible/.test(_sUaLowerCase)&&/(mozilla)(?:.*?\x20rv:([\w.]+))?/.exec(_sUaLowerCase)||[];
_oRenderEngine={};
_oRenderEngine[_oBrowserInfo.engine={mozilla:"gecko"}[_oMatch[1]]||_oMatch[1]||"unknow"]=_oBrowserInfo.engineVersion=_oMatch[2]||"0";
_oRenderEngine[_oBrowserInfo.engine+_oBrowserInfo.engineVersion]=_oRenderEngine[_oBrowserInfo.engine+_oBrowserInfo.engineVersion.split(".")[0]]=_oBrowserInfo.engineVersion;
}
return _oRenderEngine;
}
return ({browser:function(_asKey){
var _oInfo=_getInfo();
return _asKey?_oInfo[_asKey]:_oInfo;
},isBrowser:function(_asBrowserExp){
var _bIsBrowser=false,_oRenderEngine=_getRenderEngine(),_oBrowser=_getBrowser();
this.each(_asBrowserExp.split("|"),function(_asBrowser){
if(_oRenderEngine[_asBrowser]||_oBrowser[_asBrowser])
{
return !(_bIsBrowser=true);
}
});
return _bIsBrowser;
},browserVersion:function(_asBrowser){
return _getBrowser()[_asBrowser]||_getRenderEngine()[_asBrowser];
},isOS:function(_asOSExp){
var _bIsOS=false,_oOS=_getOS();
this.each(_asOSExp.split("|"),function(_asOS){
if(_oOS[_asOS])
{
return !(_bIsOS=true);
}
});
return _bIsOS;
}});
})());
_fQMWL.extend("method",(function(){
function _getLocParam(_aoLoc,_asAttr)
{
var _sHref=_aoLoc.href;
return _asAttr==="hash"&&_sHref.indexOf("#")>0&&("#"+_sHref.split("#")[1])||_aoLoc[_asAttr];
}
var _oRegExpLocationSearch=/^(?:.*?\?)?(\S*?)(?:#.*)?$/,_oSearchSnack=/&([^&]+?)=([^&]*?)(?=&)/g;
return {locSearch:function(_asUrl){
var _oResult={};
(_asUrl||this._moWin.location.href).replace(_oRegExpLocationSearch,"&$1&").replace(_oSearchSnack,function(_asValue1,_asValue2,_asValue3){
var _vOldValue=_oResult[_asValue2=decodeURIComponent(_asValue2)],_sNewValue=decodeURIComponent(_asValue3);
if(_vOldValue==_aoUndefined)
{
_oResult[_asValue2]=_sNewValue;
}
else if(_fIsStr(_vOldValue))
{
_oResult[_asValue2]=[_vOldValue,_sNewValue];
}
else{
_vOldValue.push(_sNewValue);
}
return "";
});
return _oResult;
},loc:function(_asAttr,_asValue){
var _oLoc=this._moWin.location;
if(_fIsNull(_asValue))
{
return _getLocParam(_oLoc,_asAttr);
}
else{
_oLoc[_asAttr]=_asValue;
return this;
}
}};
})());
_fQMWL.extend("method",{append:function(_avParam){
return this.insert(_avParam,"beforeEnd");
},appendTo:function(_aoDom){
var _oSelf=this;
return _oSelf.$(_aoDom).append(_oSelf)&&_oSelf;
},prepend:function(_avParam){
return this.insert(_avParam,"afterBegin");
},prependTo:function(_aoDom){
var _oSelf=this;
return _oSelf.$(_aoDom).prepend(_oSelf)&&_oSelf;
},fragment:function(_asHtml){
var _oSelf=this,_oFakeFrag$=_oSelf.$("<div>").html(_asHtml),_oFrag$=_oSelf.$("<fragment>"),_oNodeList=_oFakeFrag$.data(0).childNodes,_oCollection=[];
for(var i=0,l=_oNodeList.length;i<l;i++)
{
_oCollection[i]=_oNodeList[i].cloneNode(true);
}
return _asHtml?new _fQMWL(_fGetInWin(_oFrag$.data(0)),_oCollection,"array"):_oSelf;
},replaceWith:function(_asHtml){
return this.insert(_asHtml,"afterEnd").remove();
},attr:function(_asKey,_avValue){
var _oSelf=this;
if(_fIsNull(_avValue))
{
var _vAttrVal;
_oSelf.each(function(_aoDom){
if(_fIsDom(_aoDom))
{
_vAttrVal=_aoDom[_asKey];
_fIsNull(_vAttrVal)&&(_vAttrVal=_aoDom.getAttribute(_asKey));
return false;
}
});
return _vAttrVal;
}
else{
return _oSelf.each(function(_aoDom){
if((_aoDom.tagName=="INPUT"||_aoDom.tagName=="TEXTAREA")&&_asKey=="value")
{
_aoDom.value=_avValue;
}
else if(_fIsNum(_avValue)||_fIsStr(_avValue))
{
_aoDom.setAttribute(_asKey,_avValue);
}
else{
_aoDom[_asKey]=_avValue;
}
});
}
},focus:function(){
var _oDom=this.data(0);
_oDom&&_oDom.focus&&_oDom.focus();
return this;
},blur:function(){
var _oDom=this.data(0);
_oDom&&_oDom.blur&&_oDom.blur();
return this;
},rmAttr:function(_asKey){
return this.each(function(_aoDom){
_aoDom.removeAttribute&&_aoDom.removeAttribute(_asKey);
_aoDom[_asKey]&&(_aoDom[_asKey]=_aoUndefined);
});
},contain:function(_aoDom){
var _oSelf=this,_oCurDom=_oSelf.data(0),_oTestDom=_fFormatParam(_aoDom);
if(_fIsDom(_oCurDom)&&_fIsDom(_oTestDom))
{
if(_oCurDom.contains)
{
return _oCurDom.contains(_oTestDom);
}
else if(_oCurDom.compareDocumentPosition)
{
var _nCompareVal=_oCurDom.compareDocumentPosition(_oTestDom);
return (_nCompareVal==20||_nCompareVal==0);
}
}
return false;
},html:function(_asHtml){
var _oSelf=this;
if(_fIsNull(_asHtml))
{
var _sHtml;
_oSelf.each(function(_aoDom){
if(_aoDom.nodeType===1)
{
_sHtml=_aoDom.innerHTML;
return false;
}
});
return _sHtml||"";
}
else{
return _oSelf.each(function(_aoDom){
_aoDom.nodeType===1&&(_aoDom.innerHTML=_asHtml);
});
}
},insert:function(_avParam,_asWhere){
var _oSelf=this,_vParam=_fFormatParam(_avParam),_fOpt=_fIsDom(_vParam)?_fInsertDom:_fInsertHtml,_bNotBreak=_fOpt==_fInsertHtml;
return _oSelf.each(function(_aoDom){
if(_fIsDom(_aoDom))
{
_fOpt(_aoDom,_asWhere,_vParam);
return _bNotBreak;
}
});
},insertTo:function(_aoDom,_asWhere){
var _oSelf=this;
return _oSelf.$(_aoDom).insert(_oSelf,_asWhere)&&_oSelf;
},insertIframe:function(_aoOpts,_asWhere){
return this.each(function(_aoDom){
if(_fIsDom(_aoDom))
{
var $=this,_sCbFuncName="_ifRAmeoNlQAd_",_oOpts=_aoOpts||{},_sId=_oOpts.id=_oOpts.id||_fUnikey(),_oWin=_fGetInWin(_aoDom),_fCallBack=_oWin[_sCbFuncName],_oOptList=[];
!_fIsFunc(_fCallBack)&&(_fCallBack=_oWin[_sCbFuncName]=function(_asId,_aoIframe){
if(!_aoIframe.getAttribute("_ok_")&&!arguments.callee[_asId].src)
{
return;
}
$.call(_aoIframe,arguments.callee[_asId].onload);
});
_fCallBack[_sId]={onload:_oOpts.onload,src:_oOpts.src};
_oOpts.onload=_sCbFuncName+"('"+_sId+"', this);";
_oOpts.src=_oOpts.src||["javascript:document.open();document.writeln('<head><script>","document.domain=\\x22"+document.domain+"\\x22;","frameElement.setAttribute(\\x22_ok_\\x22,true);<\/script></head>');document.close();"].join("");
$.each(_oOpts,function(_asValue,_asKey){
_oOptList.push(_asKey,'="',_asValue,'" ');
});
_fInsertHtml(_aoDom,_asWhere,'<iframe '+_oOptList.join("")+'></iframe>');
return false;
}
});
},inWin:function(_aoDom){
return _aoDom?_fGetInWin(_aoDom):this._moWin;
},ready:function(_afReadyFn,_aoParam){
var _oSelf=this;
_oSelf.isAccess()&&_fBindReady(_oSelf._moWin,_afReadyFn,_aoParam);
return _oSelf;
},remove:function(){
return this.each(_fSafe(function(_aoDom){
try{
_aoDom.parentNode.removeChild(_aoDom);
}
catch(_oError)
{
}
}));
},rewrite:_fSafe(function(_asHtml){
var _oSelf=this,_oDoc=_oSelf._moWin.document;
_oDoc.open();
_oDoc.write(_asHtml);
_oDoc.close();
return _oSelf;
})});
_fQMWL._oOffset={_fInit:function(){
var _oBody=document.body,_oContainer=document.createElement("div"),_oInnerDiv,_oCheckDiv,_oTable,_oTd,_nBodyMarginTop=parseFloat($.$(_oBody).css("marginTop"))||0,_sHtml="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>"+"<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
$.extend(_oContainer.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});
_oContainer.innerHTML=_sHtml;
_oBody.insertBefore(_oContainer,_oBody.firstChild);
_oInnerDiv=_oContainer.firstChild;
_oCheckDiv=_oInnerDiv.firstChild;
_oTd=_oInnerDiv.nextSibling.firstChild.firstChild;
_fQMWL._oOffset.doesNotAddBorder=(_oCheckDiv.offsetTop!==5);
_fQMWL._oOffset.doesAddBorderForTableAndCells=(_oTd.offsetTop===5);
_oCheckDiv.style.position="fixed",_oCheckDiv.style.top="20px";
_fQMWL._oOffset._bSupportsFixedPosition=(_oCheckDiv.offsetTop===20||_oCheckDiv.offsetTop===15);
_oCheckDiv.style.position=_oCheckDiv.style.top="";
_oInnerDiv.style.overflow="hidden",_oInnerDiv.style.position="relative";
_fQMWL._oOffset._bSubtractsBorderForOverflowNotVisible=(_oCheckDiv.offsetTop===-5);
_fQMWL._oOffset._bDoesNotIncludeMarginInBodyOffset=(_oBody.offsetTop!==_nBodyMarginTop);
_oBody.removeChild(_oContainer);
_oBody=_oContainer=_oInnerDiv=_oCheckDiv=_oTable=_oTd=null;
_fQMWL._oOffset._fInit=_fNoop;
}};
_fQMWL.extend("method",(function(){
var _oDomEx={};
function _swap(_aoDom,_aoParams,_afCallback,_aoSelf)
{
var _oParentParams=[],_oParent=_aoDom,_oOldParams,_oStyle;
while(_oParent)
{
_oOldParams=null;
if(_aoSelf.$(_oParent).css("display")=="none")
{
_oOldParams={};
_oStyle=_oParent.style;
for(var _sName in _aoParams)
{
_oOldParams[_sName]=_oStyle[_sName];
_oStyle[_sName]=_aoParams[_sName];
}
}
_oParentParams.push(_oParent,_oOldParams);
_oParent=_oParent.parentNode;
}
_fCall(_afCallback);
for(var i=_oParentParams.length-1;i>0;i-=2)
{
if(_oParentParams[i])
{
_oStyle=_oParentParams[i-1].style;
for(var _sName in _aoParams)
{
_oStyle[_sName]=_oParentParams[i][_sName];
}
}
}
}
function _getWidthHeight(_asName,_abPadding,_abBorder,_abMargin)
{
var _oSelf=this,_oDom=_oSelf.data(0),_oBox=[_abPadding?"":"padding",-1,_abBorder?"":"border",-1,_abMargin?"margin":"",1],_nValue;
function _getWH()
{
var _oRelative;
if(_asName.toLowerCase()=='width')
{
_nValue=_oDom.offsetWidth;
_oRelative=["Left","Right"];
}
else{
_nValue=_oDom.offsetHeight;
_oRelative=["Top","Bottom"];
}
for(var i=_oBox.length-2;i>=0;i-=2)
{
if(_oBox[i])
{
for(var j=_oRelative.length-1;j>=0;j--)
{
_nValue+=_oBox[i+1]*(parseFloat(_oSelf.css(_oBox[i]+_oRelative[j]))||0);
}
}
}
return _nValue;
}
if(_oDom.offsetWidth>0)
{
_getWH();
}
else{
var _oCssShow={position:"absolute",visibility:"hidden",display:"block"};
_swap(_oDom,_oCssShow,_getWH,_oSelf);
}
return _nValue;
}
function _getOffsetByBoundClientRect()
{
var _oSelf=this,_oElem=_oSelf.data(0);
if(!_oElem||!_oElem.ownerDocument)
{
return null;
}
if(_oElem===_oElem.ownerDocument.body)
{
return null;
}
var _oBox=_oElem.getBoundingClientRect(),_oWin=_oSelf.inWin(_oElem),_oDoc=_oElem.ownerDocument,_oBody=_oDoc.body,_oDocElem=_oDoc.documentElement,_nClientTop=_oDocElem.clientTop||_oBody.clientTop||0,_nClientLeft=_oDocElem.clientLeft||_oBody.clientLeft||0,_nTop=_oBox.top+(_oWin.pageYOffset||_fQMWL.support("boxModel")&&_oDocElem.scrollTop||_oBody.scrollTop)-_nClientTop,_nLeft=_oBox.left+(_oWin.pageXOffset||_fQMWL.support("boxModel")&&_oDocElem.scrollLeft||_oBody.scrollLeft)-_nClientLeft;
return {top:_fixTop(_nTop),left:_fixLeft(_nLeft)};
}
function _fixLeft(_anVal)
{
if(window.getTop&&getTop().Scale)
{
return getTop().Scale.fixOffsetLeft(_anVal);
}
return _anVal;
}
function _fixTop(_anVal)
{
if(window.getTop&&getTop().Scale)
{
return getTop().Scale.fixOffsetTop(_anVal);
}
return _anVal;
}
function _getOffset()
{
var _oSelf=this,_oElem=_oSelf.data(0);
if(!_oElem||!_oElem.ownerDocument)
{
return null;
}
if(_oElem===_oElem.ownerDocument.body)
{
return null;
}
_fQMWL._oOffset._fInit();
var _oOffsetParent=_oElem.offsetParent,_oPrevOffsetParent=_oElem,_oDoc=_oElem.ownerDocument,_oComputedStyle,_oDocElem=_oDoc.documentElement,_oBody=_oDoc.body,_oDefaultView=_oDoc.defaultView,_oPrevComputedStyle=_oDefaultView?_oDefaultView.getComputedStyle(_oElem,null):_oElem.currentStyle,_nTop=_oElem.offsetTop,_oLeft=_oElem.offsetLeft;
while((_oElem=_oElem.parentNode)&&_oElem!==_oBody&&_oElem!==_oDocElem)
{
if(_fQMWL._oOffset._bSupportsFixedPosition&&_oPrevComputedStyle.position==="fixed")
{
break;
}
_oComputedStyle=_oDefaultView?_oDefaultView.getComputedStyle(_oElem,null):_oElem.currentStyle;
_nTop-=_fixTop(_oElem.scrollTop);
_oLeft-=_fixLeft(_oElem.scrollLeft);
if(_oElem===_oOffsetParent)
{
_nTop+=_fixTop(_oElem.offsetTop);
_oLeft+=_fixLeft(_oElem.offsetLeft);
if(_fQMWL._oOffset.doesNotAddBorder&&!(_fQMWL._oOffset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(_oElem.nodeName)))
{
_nTop+=_fixTop(parseFloat(_oComputedStyle.borderTopWidth))||0;
_oLeft+=_fixLeft(parseFloat(_oComputedStyle.borderLeftWidth))||0;
}
_oPrevOffsetParent=offsetParent,offsetParent=_oElem.offsetParent;
}
if(_fQMWL._oOffset._bSubtractsBorderForOverflowNotVisible&&_oComputedStyle.overflow!=="visible")
{
_nTop+=_fixTop(parseFloat(_oComputedStyle.borderTopWidth))||0;
_oLeft+=_fixLeft(parseFloat(_oComputedStyle.borderLeftWidth))||0;
}
_oPrevComputedStyle=_oComputedStyle;
}
if(_oPrevComputedStyle.position==="relative"||_oPrevComputedStyle.position==="static")
{
_nTop+=_fixTop(_oBody.offsetTop);
_oLeft+=_fixLeft(_oBody.offsetLeft);
}
if(_fQMWL._oOffset._bSupportsFixedPosition&&_oPrevComputedStyle.position==="fixed")
{
_nTop+=_fixTop(Math.max(_oDocElem.scrollTop,_oBody.scrollTop));
_oLeft+=_fixLeft(Math.max(_oDocElem.scrollLeft,_oBody.scrollLeft));
}
return {top:_nTop,left:_oLeft};
}
_oDomEx.offset="getBoundingClientRect" in document.documentElement?_getOffsetByBoundClientRect:_getOffset;
function _fCreatePosMethod(_asName)
{
var _sMethod="scroll"+_asName;
_oDomEx[_sMethod]=function(){
var _oSelf=this,_oElem=_oSelf.data(0),_oWin=_oSelf.inWin(_oElem);
if(!_oElem)
{
return null;
}
return _oWin?("pageXOffset" in _oWin)?_oWin[_asName=="Top"?"pageYOffset":"pageXOffset"]:_fQMWL.support("boxModel")&&_oWin.document.documentElement[_sMethod]||_oWin.document.body[_sMethod]:_oElem[_sMethod];
};
}
var _oArr=["Left","Top"];
for(var i=0;i<_oArr.length;i++)
{
_fCreatePosMethod(_oArr[i]);
}
_oArr=["Height","Width"];
function _fCreateSizeMethod(_asName)
{
var _asType=_asName.toLowerCase();
_oDomEx["inner"+_asName]=function(){
var _oSelf=this;
return _oSelf.size()?_fCall(_oSelf,_getWidthHeight,[_asName,true]):null;
};
_oDomEx["outer"+_asName]=function(_abMargin){
var _oSelf=this;
return _oSelf.size()?_fCall(_oSelf,_getWidthHeight,[_asName,true,true,true]):null;
};
_oDomEx[_asType]=function(){
var _oSelf=this,_oElem=_oSelf.data(0);
return (_oElem&&typeof _oElem==="object"&&"setInterval" in _oElem)?_oElem.document.compatMode==="CSS1Compat"&&_oElem.document.documentElement["client"+_asName]||_oElem.document.body["client"+_asName]:(_oElem.nodeType===9)?Math.max(_oElem.documentElement["client"+_asName],_oElem.body["scroll"+_asName],_oElem.documentElement["scroll"+_asName],_oElem.body["offset"+_asName],_oElem.documentElement["offset"+_asName]):_fCall(_oSelf,_getWidthHeight,[_asType]);
};
}
for(var i=0;i<_oArr.length;i++)
{
_fCreateSizeMethod(_oArr[i]);
}
return _oDomEx;
})());
_fQMWL.extend("method",(function(){
var _oExprAlpha=/alpha\([^)]*\)/,_oExprExclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,_oExprDashAlpha=/-([a-z])/ig,_oExprOpacity=/opacity=([^)]*)/,_oExprUpper=/([A-Z])/g,_fCamelCase=function(_aoAll,_asLetter){
return _asLetter.toUpperCase();
},_fCamelName=_fQMWL.camelName=function(_asName){
return _asName.replace(_oExprDashAlpha,_fCamelCase);
};
function _canSetStyle(_aoDom)
{
return !(!_aoDom||_aoDom.nodeType===3||_aoDom.nodeType===8);
}
function _curStyle(_aoDom,_asName)
{
var _sStyle=_aoDom.style,_oDefaultView=_fGetInWin(_aoDom),_oCurrentStyle=_aoDom.currentStyle,_sRet;
if(_asName==="opacity"&&!_fQMWL.support("opacity")&&_oCurrentStyle)
{
_sRet=_oExprOpacity.test(_oCurrentStyle.filter||"")?(Number(RegExp.$1)/100)+"":"";
return _sRet===""?"1":_sRet;
}
if(_oCurrentStyle)
{
var _sCamelCase=_fCamelName(_asName);
_sRet=_oCurrentStyle[_asName]||_oCurrentStyle[_sCamelCase];
}
else if(_aoDom.nodeType!=9)
{
var _oComputedStyle=_oDefaultView.getComputedStyle(_aoDom,null);
_asName=_asName.replace(_oExprUpper,"-$1").toLowerCase();
_sRet=_oComputedStyle.getPropertyValue(_asName);
_asName==="opacity"&&_sRet===""&&(_sRet="1");
}
return _sRet;
}
function _setStyle(_aoDom,_asName,_avValue)
{
if(_fIsNull(_avValue))
{
return;
}
var _oStyle=_aoDom.style||_aoDom;
if(!_fQMWL.support("opacity")&&_asName==="opacity")
{
_oStyle.zoom=1;
var _sOpacity=parseInt(_avValue,10)+""==="NaN"?"":"alpha(opacity="+_avValue*100+")",_sFilter=_oStyle.filter||_curStyle(_aoDom,"filter")||"";
_oStyle.filter=_oExprAlpha.test(_sFilter)?_sFilter.replace(_oExprAlpha,_sOpacity):_sOpacity;
}
_asName=_fCamelName(_asName);
if(_fIsNum(_avValue)&&!_oExprExclude.test(_asName))
{
_avValue+="px";
}
_aoDom.style[_asName]=_avValue;
}
function _setStyleForEach(_aoDom,_aoStyleList)
{
_canSetStyle(_aoDom)&&_setStyle(_aoDom,_aoStyleList[0],_aoStyleList[1]);
}
function _setStylesForEach(_aoDom,_aoStyleInfo)
{
if(_canSetStyle(_aoDom))
{
for(var _sName in _aoStyleInfo)
{
_aoStyleInfo.hasOwnProperty(_sName)&&_setStyle(_aoDom,_sName,_aoStyleInfo[_sName]);
}
}
}
return ({css:function(_avParam1,_avParam2){
var _oSelf=this;
if(_fIsNull(_avParam2))
{
if(_fIsStr(_avParam1))
{
var _oDom=_oSelf.data(0);
if(_fIsDom(_oDom))
{
return _curStyle(_oDom,_avParam1);
}
return _aoUndefined;
}
else{
_oSelf.each(_setStylesForEach,{vParam:_avParam1});
}
}
else{
_oSelf.each(_setStyleForEach,{vParam:arguments});
}
return this;
},show:function(){
return this.css("display","");
},hide:function(){
return this.css("display","none");
},toggle:function(){
return this[this.css("display")=="none"?"show":"hide"]();
},addClass:function(_asClass){
return !_fIsNull(_asClass)?this.each(function(_aoDom){
var _sClassName=" "+_aoDom.className+" ";
if(_sClassName.indexOf(" "+_asClass+" ")<0)
{
_aoDom.className+=_aoDom.className?" "+_asClass:_asClass;
}
}):this;
},rmClass:function(_asClass){
return this.each(function(_aoDom){
if(!_fIsNull(_asClass))
{
var _sClassName=" "+_aoDom.className+" ";
_sClassName=_sClassName.replace(" "+_asClass+" "," ");
_aoDom.className=_fTrim(_sClassName);
}
else{
_aoDom.className="";
}
});
},hasClass:function(_asClass){
return !!this.data(0)&&(" "+this.data(0).className+" ").indexOf(" "+_asClass+" ")>-1;
}});
})());
_fQMWL.extend("method",{addPageUnloadEvent:function(_afEventFunc){
var _oSelf=this,_oWin=_oSelf._moWin;
if(!_oWin._ununloadsets)
{
_oWin._ununloadsets=[_afEventFunc];
_oWin.onunload&&_oWin._ununloadsets.push(_oWin.onunload);
_oWin.onunload=function(){
var _oUnloads=_oWin._ununloadsets;
for(var i=_oUnloads.length-1;i>-1;i--)
{
_fCall(_oWin,_oUnloads[i]);
}
};
}
else{
_oWin._ununloadsets.push(_afEventFunc);
}
return _oSelf;
},addEvent:_fEventOptCreate(_fAddEvent,_fAddEvents,false),delEvent:_fEventOptCreate(_fDelEvent,_fDelEvents),event$:function(_asGlobalEventObjName){
return this.$(_fGetGlobalEventObj(_asGlobalEventObjName));
},fireEvent:_fEventOptCreate(_fFireEvent),on:_fEventOptCreate(_fAddEvent,_fAddEvents,true),stopPropagation:function(_aoEvent){
if(_aoEvent)
{
_aoEvent.stopPropagation?_aoEvent.stopPropagation():(_aoEvent.cancelBubble=true);
}
return this;
},preventDefault:function(_aoEvent){
if(_aoEvent)
{
_aoEvent.preventDefault?_aoEvent.preventDefault():(_aoEvent.returnValue=false);
}
return this;
},target:function(_aoEvent){
return _aoEvent&&(_aoEvent.srcElement||_aoEvent.target);
}});
_fQMWL.extend("method",(function(){
var _oExprTimeStamp=/(\?|&)r=.*?(&|$)/,_oExprQuery=/\?/,_nGlobalActivexNum=0,_oAjaxSetting={bAsync:true,bCache:true,sContentType:"application/x-www-form-urlencoded",bGlobal:true,nTimeout:5000,sType:"GET",bProcessData:true,ongetxhr:_aoWin.XMLHttpRequest&&(_aoWin.location.protocol!=="file:"||!_aoWin.ActiveXObject)?function(_aoNewWin){
return new (_aoNewWin||_aoWin).XMLHttpRequest();
}:_fSafe(function(_aoNewWin){
return new (_aoNewWin||_aoWin).ActiveXObject("Microsoft.XMLHTTP");
})},_oAccepts={xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"},_sAjaxEventSet="|onbeforesend|oncomplete|ondatafilter|onerror|onsuccess|";
function _add(_avValue,_aoData,_avKey)
{
var _bIsKeyNum=_fIsNum(_avKey),_sKey=_bIsKeyNum?_avValue.name:_avKey,_vValue=_bIsKeyNum?_avValue.value:_avValue;
!_fIsNull(_sKey)&&_aoData.push(_fEncodeURIComponent(_sKey)+"="+_fEncodeURIComponent(_fIsFunc(_vValue)?_fSafe(_vValue,"ajax build data : "+_sKey+" func")():_vValue));
}
function _addQuery(_asUrl,_asQuery)
{
return _asUrl+(_oExprQuery.test(_asUrl)?"&":"?")+_asQuery;
}
function _bulidContentData(_avData,_asContentType,_abProcessData)
{
if(_abProcessData===false)
{
return _avData;
}
var _oSelf=this,_oData=[];
if(_fIsStr(_avData))
{
_oData.push(_avData);
}
else if(_fIsArr(_avData)||_fIsObj(_avData))
{
_oSelf.each(_avData,_add,{vParam:_oData});
}
return _oData.join("&");
}
function _responseDataProcess(_aoXhr,_asType,_aoSetting)
{
var _sContentType=_aoXhr.getResponseHeader("content-type")||"",_bXml=_asType==="xml"||!_asType&&_sContentType.indexOf("xml")>=0,_vData=_bXml?_aoXhr.responseXML:_aoXhr.responseText;
_bXml&&_vData.documentElement.nodeName==="parsererror"&&_fThrowException("parsererror");
_aoSetting&&_fIsFunc(_aoSetting.ondatafilter)&&(_vData=_aoSetting.ondatafilter(_vData,_asType));
if(_fIsStr(_vData))
{
if(_asType==="json"||!_asType&&_sContentType.indexOf("json")>=0)
{
}
else if(_asType==="script"||!_asType&&_sContentType.indexOf("javascript")>=0)
{
}
}
return _vData;
}
function _isAjaxEventSetting(_aoEvent)
{
var _bIsAjaxSet=false;
for(var _sName in _aoEvent)
{
if(_fIsFunc(_aoEvent[_sName])&&_sAjaxEventSet.indexOf("|"+_sName+"|")!=-1)
{
_bIsAjaxSet=true;
break;
}
}
return _bIsAjaxSet;
}
function _isHttpSuccess(_aoXhr)
{
try{
return !_aoXhr.status&&location.protocol==="files:"||(_aoXhr.status>=200&&_aoXhr.status<300)||_aoXhr.status===304||_aoXhr.status===1223||_aoXhr.status===0;
}
catch(_oError)
{
}
return false;
}
function _simpleAjaxParamFormat(_aoArg,_asType,_asEventName)
{
var _sEventName=_asEventName||"onsuccess",_oSetting={sUrl:_aoArg[0],sType:_asType},_vParam1=_aoArg[1],_vParam2=_aoArg[2];
if(_fIsFunc(_vParam1))
{
_oSetting[_sEventName]=_vParam1;
_oSetting.sDataType=_vParam2;
}
else if(_isAjaxEventSetting(_vParam1))
{
_fExtend(_oSetting,_vParam1,{sDataType:_vParam2});
}
else if(_isAjaxEventSetting(_vParam2))
{
_fExtend(_oSetting,_vParam2,{vData:_vParam1,sDataType:_aoArg[3]});
}
else{
_oSetting.vData=_vParam1;
_oSetting[_sEventName]=_vParam2;
_oSetting.sDataType=_aoArg[3];
}
return _oSetting;
}
return ({ajax:function(_aoSetting){
var _oSelf=this,_oSetting=_fExtend({},_oAjaxSetting,_aoSetting),_oContext=_oSetting.oContext||_oSetting,_sType=_oSetting.sType.toUpperCase(),_sUrl=_oSetting.sUrl,_sData=_bulidContentData.call(_oSelf,_oSetting.vData,_oSetting.sContentType,_oSetting.bProcessData),_bRequestDone=false,_sStatus,_vResponseData,_oErr,_oXhr,_nTimer;
if(!_sUrl)
{
return _oSelf;
}
if(_oSetting.bCache===false&&_sType==="GET")
{
var _sTimeStampQuery="r="+_fNow(),_sNewUrl=_sUrl.replace(_oExprTimeStamp,"$1"+_sTimeStampQuery+"$2");
_sUrl=_sUrl===_sNewUrl?_addQuery(_sNewUrl,_sTimeStampQuery):_sNewUrl;
}
_sData&&_sType==="GET"&&(_sUrl=_addQuery(_sUrl,_sData));
if(!(_oXhr=_fCall(_oSetting.ongetxhr,[_oSelf._moWin])))
{
return _oSelf;
}
_oSetting.bGlobal&&!_nGlobalActivexNum++&&_fireGlobalEvent("start");
_oXhr.open(_sType,_sUrl,_oSetting.bAsync);
try{
(_sData||_aoSetting&&_aoSetting.sContentType)&&_oXhr.setRequestHeader("Content-Type",_oSetting.sContentType);
_oXhr.setRequestHeader("Accept",[_oSetting.sDataType&&_oAccepts[_oSetting.sDataType],_oAccepts._default].join(", "));
}
catch(_oError)
{
}
if(_fCall(_oContext,_oSetting.onbeforesend,[_oXhr])===false)
{
_oSetting.bGlobal&&!--_nGlobalActivexNum&&_fireGlobalEvent("stop");
_oXhr.abort();
return _oSelf;
}
_oSetting.bGlobal&&_fireGlobalEvent("send");
_oXhr.onreadystatechange=_onreadystatechange;
try{
var _fOldAbort=_oXhr.abort;
_oXhr.abort=function(){
var _oAbortXhr=_oXhr;
_oAbortXhr&&!(_oXhr=_aoUndefined)&&_fOldAbort.call(_oAbortXhr);
_onreadystatechange("abort");
};
}
catch(_oError)
{
}
if(_oSetting.bAsync&&_oSetting.nTimeout>0)
{
_nTimer=setTimeout(function(){
_oXhr&&!_bRequestDone&&_onreadystatechange("timeout");
},_oSetting.nTimeout);
}
try{
_oXhr.send(_sType!="GET"?_sData:_aoUndefined);
}
catch(_oErr)
{
_sStatus="senderr";
_handleError();
_handleComplete();
}
!_oSetting.bAsync&&_onreadystatechange();
function _fireGlobalEvent(_asEventType,_aoParamList)
{
_oSelf.event$("ajax").fireEvent(_asEventType,_aoParamList,{oContext:_oContext});
}
function _handleComplete()
{
!!_nTimer&&(clearTimeout(_nTimer)||1)&&(_nTimer=0);
_fCall(_oContext,_oSetting.oncomplete,[_oXhr,_sStatus]);
_oSetting.bGlobal&&_fireGlobalEvent("complete",[_oXhr,_sStatus]);
_oSetting.bGlobal&&!--_nGlobalActivexNum&&_fireGlobalEvent("stop");
}
function _handleError()
{
_fCall(_oContext,_oSetting.onerror,[_oXhr,_sStatus,_oErr]);
_oSetting.bGlobal&&_fireGlobalEvent("error",[_oXhr,_sStatus,_oErr]);
}
function _handleSuccess()
{
_fCall(_oContext,_oSetting.onsuccess,[_vResponseData,_sStatus,_oXhr]);
_oSetting.bGlobal&&_fireGlobalEvent("success",[_vResponseData,_sStatus,_oXhr]);
}
function _onreadystatechange(_asCustomStatus)
{
if(!_oXhr||_oXhr.readyState===0||_asCustomStatus==="abort")
{
_bRequestDone=true;
_oXhr&&(_oXhr.onreadystatechange=_fNoop);
!_bRequestDone&&_handleComplete();
}
else if(!_bRequestDone&&_oXhr&&(_oXhr.readyState===4||_asCustomStatus==="timeout"))
{
_bRequestDone=true;
_oXhr.onreadystatechange=_fNoop;
_sStatus=_asCustomStatus==="timeout"?"timeout":!_isHttpSuccess(_oXhr)?"error":"success";
if(_sStatus==="success")
{
try{
_vResponseData=_responseDataProcess(_oXhr,_oSetting.sDataType,_oSetting);
}
catch(_oExpection)
{
_sStatus=_oExpection.type||"parsererror";
_oErr=_oExpection;
}
}
(_sStatus==="success"?_handleSuccess:_handleError)();
_handleComplete();
_asCustomStatus==="timeout"&&_oXhr.abort();
_oSetting.bAsync&&(_oXhr=_aoUndefined);
}
}
return _oSelf;
},ajaxSetting:function(_aoSetting){
var _vRet=this;
_aoSetting?_fExtend(_oAjaxSetting,_aoSetting):(_vRet=_oAjaxSetting);
return _vRet;
},get:function(){
return this.ajax(_simpleAjaxParamFormat(arguments,"GET"));
},load:function(){
var _oSelf=this,_oOptDom;
_oSelf.each(function(_aoObj){
if(_fIsDom(_aoObj))
{
_oOptDom=_aoObj;
return false;
}
});
if(!_oOptDom)
{
return _oSelf;
}
var _oSettings=_simpleAjaxParamFormat(arguments,"GET","oncomplete"),_fUserSuccess=_oSettings.onsuccess;
return _oSelf.ajax(_fExtend(_oSettings,{sDataType:"html",onsuccess:function(){
_oOptDom.innerHTML=_fFilteScript(arguments[0]);
_fCall(this,_fUserSuccess,arguments);
}}));
},loadJS:function(_asSrc,_aoSetting,_aoAttr){
var _oSelf=this,_oWin=_oSelf._moWin,_oScript$=_oSelf.$("<script>"),_oScriptDom=_oScript$.data(0),_fOnLoad=function(_abIsOK,_abIsDelay){
if(_nTimer!=0)
{
_oWin.clearTimeout(_nTimer);
_nTimer=0;
_abIsDelay?_oWin.setTimeout(function(){
_fCall(_oScriptDom,_aoSetting,"onload",[!!_abIsOK]);
},100):_fCall(_oScriptDom,_aoSetting,"onload",[!!_abIsOK]);
if(_aoSetting.bNeedRemove===true)
{
_oScript$.remove();
}
}
},_nTimer=_oWin.setTimeout(function(){
_fOnLoad(false);
_oScript$.remove();
},_fIsNum(_aoSetting&&_aoSetting.nTimeout)?_aoSetting.nTimeout:10000);
_oSelf.each(_aoAttr,function(_avVal,_asKey){
!_fIsNull(_avVal)&&_oScriptDom.setAttribute(_asKey,_avVal);
}).$("head").append(_fExtend(_oScriptDom,{type:"text/javascript",src:_asSrc,onload:_fOnLoad,onreadystatechange:function(){
({loaded:true,complete:true}[this.readyState])&&_fOnLoad(true,true);
}}));
return _oSelf;
},post:function(){
return this.ajax(_simpleAjaxParamFormat(arguments,"POST"));
}});
})());
_fQMWL.extend("method",(function(){
function _QMTemplate(_avTmplStr,_asTmplReplaceVar,_asType)
{
var _oSelf=this;
_oSelf._msTmplStr=_avTmplStr.join?_avTmplStr.join(""):_avTmplStr.toString();
_oSelf._msTmplReplaceVar=_asTmplReplaceVar||"$";
_oSelf._replace=_asType=="exp"?_oSelf._replaceWithExp:_oSelf._replaceWithParse;
}
;_QMTemplate.prototype={toString:function(){
return this._msTmplStr;
},replace:function(_aoJson,_asSection,_aoJsAdapter){
return this._replace(_aoJson,_asSection,_aoJsAdapter);
},_replaceWithParse:function(_aoJson,_abIsOnlyReplaceExist,_aoRoot){
var _oSelf=this,_sReplaceVar=_oSelf._msTmplReplaceVar,_oTmplData=_oSelf._moTmplData,_oLinkData=_oSelf._moLinkData,_bIsNeeCompile=!_oTmplData,_fGet=_abIsOnlyReplaceExist?_oSelf._getWithNoReplace:_oSelf._get;
if(_bIsNeeCompile)
{
_oTmplData=_oSelf._moTmplData=_oSelf._msTmplStr.split(_oSelf._msTmplReplaceVar);
_oLinkData=_oSelf._moLinkData=_oSelf._moTmplData.concat();
}
for(var i=1,_nLen=_oTmplData.length;i<_nLen;i+=2)
{
_oLinkData[i]=_fGet.call(_oSelf,_bIsNeeCompile?(_oTmplData[i]=_oTmplData[i].split(".")):_oTmplData[i],_aoJson,_aoRoot,_sReplaceVar);
}
return _oLinkData.join("");
},_replaceWithExp:function(_aoJson,_asSection,_aoJsAdapter){
var _oSelf=this,_fHandler;
if(!_oSelf._mfReplace)
{
_oSelf._compile();
}
if(typeof _asSection=="string")
{
var _vSecData=_oSelf._moSecDatas[_asSection];
if(_vSecData)
{
_fHandler=typeof _vSecData!="function"?_oSelf._moSecDatas[_asSection]=_oSelf._genHandleFunc(_vSecData):_vSecData;
}
}
else{
_fHandler=_oSelf._mfReplace;
}
try{
return _fHandler&&_fHandler(_aoJson,_oSelf._moTmplDatas,_oSelf._get,_oSelf._msTmplReplaceVar,_oSelf._tplFunc(),_aoJsAdapter||_asSection)||"";
}
catch(_oError)
{
return _oError.message;
}
},_compile:function(){
var _oSelf=this,_nForLen=0,_oCompileDatas=[],_oForStack=[],_oSecStack=[],_oSecDatas=_oSelf._moSecDatas=[],_sReplaceVar=_oSelf._msTmplReplaceVar,_oRegExp=new RegExp(["","(.*?)",""].join(_fRegFilter(_sReplaceVar)),"g"),_sGetVar="_afG('$1'.split('.'),_oD,_aoD,_aoR)",_oTmplDatas=_oSelf._moTmplDatas=_oSelf._msTmplStr.split(["","@",""].join(_sReplaceVar)),_sTmplValue;
for(var i=0,_nLen=_oTmplDatas.length;i<_nLen;i++)
{
_sTmplValue=_oTmplDatas[i];
if(i%2==0)
{
_oCompileDatas.push("_oR.push(_aoT[",i,"].replace(_oD,false,_aoD));");
_oTmplDatas[i]=new _QMTemplate(_sTmplValue,_sReplaceVar);
}
else if(_sTmplValue=="else")
{
_oCompileDatas.push("}else{");
}
else if(_sTmplValue=="endsec")
{
if(_oSecStack.length)
{
var _oData=_oSecStack.pop();
_oSecDatas[_oData[0]]=_oCompileDatas.slice(_oData[1]);
}
}
else if(_sTmplValue=="endfor")
{
_oForStack.length&&_oCompileDatas.push("try{delete _oD._parent_;delete _oD._idx_;}catch(e){}","}_oD=_oS",_oForStack.pop(),";");
}
else if(_sTmplValue=="endif")
{
_oCompileDatas.push("}");
}
else if(_sTmplValue.indexOf("else if(")==0)
{
_oCompileDatas.push("}",_sTmplValue.replace(_oRegExp,_sGetVar),"{");
}
else if(_sTmplValue.indexOf("if(")==0)
{
_oCompileDatas.push(_sTmplValue.replace(_oRegExp,_sGetVar),"{");
}
else if(_sTmplValue.indexOf("for(")==0)
{
_oForStack.push(++_nForLen);
_oCompileDatas.push("var _sI",_nForLen,",_oD",_nForLen,",_oS",_nForLen,"=_oD;",_sTmplValue.replace(_oRegExp,["_sI",_nForLen," in (_oD",_nForLen,"=",_sGetVar,")"].join("")),"{","_oD=_oD",_nForLen,"[_sI",_nForLen,"];","try{","_oD._parent_=_oS",_nForLen,";","_oD._idx_=_sI",_nForLen,";","}catch(e){}");
}
else if(_sTmplValue.indexOf("sec ")==0)
{
_oSecStack.push([_sTmplValue.split(" ").pop(),_oCompileDatas.length]);
}
else if(_sTmplValue.indexOf("eval ")==0)
{
_oCompileDatas.push("_oR.push(",_sTmplValue.substr(5).replace(_oRegExp,_sGetVar),");");
}
else if(_sTmplValue.indexOf("html(")==0)
{
_oCompileDatas.push("_oR.push(_aoFc.htmlEncode(",_sTmplValue.substr(5).replace(_oRegExp,_sGetVar),");");
}
else if(_sTmplValue.indexOf("SetVar(")==0)
{
_oCompileDatas.push("_oR.push(_aoFc.SetVar(_oD,",_sTmplValue.substr(7).replace(_oRegExp,_sGetVar),");");
}
}
_oSelf._mfReplace=_oSelf._genHandleFunc(_oCompileDatas);
return _oCompileDatas;
},_genHandleFunc:function(_aoCompileDatas){
try{
return eval(['([function(_aoD,_aoT,_afG,_aoR, _aoFc, A){var _oR=[],_oD=_aoD;',_aoCompileDatas.join(""),'return _oR.join("");}])'].join(""))[0];
}
catch(_oErr)
{
return function(){
return "compile err!";
};
}
},_getWithNoReplace:function(_aoVarKeys,_aoJson,_aoRootJson,_asReplaceVar){
var _vVal=this._get(_aoVarKeys,_aoJson,_aoRootJson,_asReplaceVar);
return typeof _vVal=="undefined"?_asReplaceVar+_aoVarKeys.join(".")+_asReplaceVar:_vVal;
},_get:function(_aoVarKeys,_aoJson,_aoRootJson,_asReplaceVar){
var _nLen=_aoVarKeys.length,_sKey,_vVal,_oUndefined;
if(_nLen>1)
{
try{
_vVal=_aoJson;
for(var i=0;i<_nLen;i++)
{
_sKey=_aoVarKeys[i];
if(_sKey=="_root_")
{
_vVal=_aoRootJson;
}
else{
_vVal=_vVal[_sKey];
}
}
}
catch(_oError)
{
_vVal=_oUndefined;
}
}
else{
_vVal={"_var_":_asReplaceVar,"_this_":_aoJson}[_sKey=_aoVarKeys[0]]||_aoJson[_sKey];
}
return _vVal;
},_tplFunc:function(){
return {htmlEncode:_fHtmlEncode,SetVar:function(_aoJson,_asName,_asValue){
_aoJson[_asName]=_asValue;
return '';
}};
}};
return ({T:function(_avTmplStr,_asTmplReplaceVar){
return new _QMTemplate(_avTmplStr,_asTmplReplaceVar);
},TE:function(_avTmplStr,_asTmplReplaceVar){
if(_aoWin.QMTmplChecker)
{
var _oError=(new _aoWin.QMTmplChecker(_avTmplStr.join?_avTmplStr:[_avTmplStr],_asTmplReplaceVar)).getErrors();
_oError.length&&_aoWin.debug&&_aoWin.debug(_oError.join("\n"),"code");
}
return new _QMTemplate(_avTmplStr,_asTmplReplaceVar,"exp");
}});
})());
_fQMWL.extend("method",(function(){
function _timerCreater(_afTimer)
{
return function(_afFn,_anTime,_aoParam){
var _oSelf=this;
return _fIsFunc(_afFn)&&_oSelf._moWin[_afTimer](function(){
_oSelf.call((_aoParam&&_aoParam.oContext)||_oSelf,_afFn,_aoParam&&_aoParam.oParam);
},_anTime)||-1;
};
}
return ({canLoop:_fCanLoop,setInterval:_timerCreater("setInterval"),setTimeout:_timerCreater("setTimeout"),eval:function(_asCode){
if(_asCode&&_oExprNotWhite.test(_asCode))
{
var _oDoc=this._moWin.document,_oHead=_oDoc.getElementsByTagName("head")[0]||_oDoc.documentElement,_oScript=_oDoc.createElement("script");
_oScript.type="text/javascript";
if(this.support("scriptEval"))
{
_oScript.appendChild(_oDoc.createTextNode(_asCode));
}
else{
_oScript.text=_asCode;
}
_oHead.insertBefore(_oScript,_oHead.firstChild);
_oHead.removeChild(_oScript);
}
return this;
},getValue:function(_aoObj,_asAttr){
if(!(_aoObj&&_aoObj[_asAttr]))
{
return null;
}
return _fIsFunc(_aoObj[_asAttr])?_aoObj[_asAttr]():_aoObj[_asAttr];
},bindContext:function(_aoContext,_afFunc){
return function(){
return _afFunc.apply(_aoContext,arguments);
};
},delegate:(function(){
function TMP()
{
}
return function(obj,props){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(props)
{
_fExtend(tmp,props);
}
return tmp;
};
})(),evalVal:function(_asCode){
var _sKey="_gEVaLvAl_",_oWin=this._moWin,_vVal;
_asCode&&this.eval("(function(){try{window."+_sKey+"="+_asCode+";}catch(_oError){}})();");
_vVal=_oWin[_sKey];
_oWin[_sKey]=_aoUndefined;
return _vVal;
},extend:_fExtend,extendEx:_fExCreater(_fCall),filteScript:_fFilteScript,noop:_fNoop,isAccess:function(){
return _fIsAccessibleWin(this._moWin);
},isArr:_fIsArr,isDom:_fIsDom,isFunc:_fIsFunc,isNull:_fIsNull,isNum:_fIsNum,isObj:_fIsObj,isStr:_fIsStr,isAccessWin:_fIsAccessibleWin,now:_fNow,random:_fRandom,regFilter:_fRegFilter,statTime:function(_asType){
var _oSelf=this,_nNow=_fNow();
_asType!="reset"&&_fDebug([_asType,_nNow-_nStatTime].join(":"));
_nStatTime=_nNow;
return _oSelf;
},toArr:_fToArr,toMap:_fToMap,toNum:_fToNum,toStr:_fToStr,unikey:_fUnikey,unique:_fUnique,trim:_fTrim,htmlEncode:_fHtmlEncode,htmlDecode:function(_asStr){
return _asStr&&_asStr.replace?(_asStr.replace(/&nbsp;/gi," ").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,"\"").replace(/&#39;/gi,"'").replace(/&amp;/gi,"&")):_asStr;
},getAsiiStrLen:function(_asStr){
return (_asStr||"").replace(/[^\x00-\xFF]/g,"aa").length;
},subAsiiStr:function(_asStr,_anLen,_asPlus,_abHtml){
var _oSelf=this,_fDumb=function(_asText){
return _asText;
},_fOutput=_abHtml?_oSelf.htmlEncode:_fDumb,_sStr=(_abHtml?_oSelf.htmlDecode:_fDumb)(_oSelf.trim((_asStr||"").toString())),_sPlus=_asPlus||"",_nCutLen=Math.max(_anLen-_sPlus.length,1),_nStrLen=_sStr.length,_nCountLen=0,_nCutPos=-1,_nCharCode;
for(var i=0;i<_nStrLen;i++)
{
_nCharCode=_sStr.charCodeAt(i);
_nCountLen+=_nCharCode==35||_nCharCode==87?1.2:(_nCharCode>255?1.5:1);
if(_nCutPos==-1&&_nCountLen>_nCutLen)
{
_nCutPos=i;
}
if(_nCountLen>_anLen)
{
return _fOutput(_sStr.substr(0,_nCutPos))+_sPlus;
}
}
return _fOutput(_sStr);
},isUrl:function(_asText){
return (_asText||"").replace(/(((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-]*(\?[^\s\u4e00-\u9fa5]+)?)?)?/ig,"url")=="url";
},wait:function(_afWaitFunc,_afFinishCallBackFunc,_anInterval,_anTimeout){
var _oSelf=this,_nTime=0,_nInterval=_anInterval||500,_nTimeoutTime=(_anTimeout||10*500)/_nInterval;
(function(){
if(_fCall(_oSelf,_afWaitFunc))
{
return _fCall(_oSelf,_afFinishCallBackFunc,[true]);
}
if(_nTime++>_nTimeoutTime)
{
return _fCall(_oSelf,_afFinishCallBackFunc,[false]);
}
setTimeout(arguments.callee,_nInterval);
})();
return _oSelf;
}});
})());
_fQMWL.extend("method",(function(){
function _getDomain()
{
return document.domain;
}
return ({setCookie:function(_asName,_asValue,_aoExpires,_asPath,_asDomain,_abSecure){
_asName&&(document.cookie=this.T(['$name$=$value$; ',!_aoExpires?'':'expires=$expires$; ','path=$path$; ','domain=$domain$; ',!_abSecure?'':'$secure$']).replace({name:_asName,value:(_asValue||"").replace(/%/ig,"%25").replace(/=/ig,"%3D").replace(/;/ig,"%3B"),expires:_aoExpires&&_aoExpires.toGMTString(),path:_asPath||'/',domain:_asDomain||_getDomain(),secure:_abSecure?"secure":""}));
return this;
},getCookie:function(_asName){
return (new RegExp(["(\\b|\\s|^|;)",_fRegFilter(_asName),"=([^;]*);?"].join(""))).test(document.cookie)&&decodeURIComponent(RegExp["$2"]);
},delCookie:function(_asName,_asPath,_asDomain){
return this.setCookie(_asName,"",new Date(0),_asPath,_asDomain);
}});
})());
_fQMWL.extend("method",(function(){
var _oSpecialKeys={27:'esc',9:'tab',32:'space',10:"enter",13:'enter',8:'backspace',145:'scroll',20:'capslock',144:'numlock',19:'pause',45:'insert',36:'home',46:'del',35:'end',33:'pageup',34:'pagedown',37:'left',38:'up',39:'right',40:'down',107:'=',109:'-',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',188:'<',190:'>',191:'/',192:'`',219:'[',220:'\\',221:']',222:'\''},_oShiftKeyMap={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};
function _isWord(_anCharCode)
{
return _anCharCode>=49&&_anCharCode<=90;
}
function _format(_asHotKey)
{
return (_asHotKey||"").toLowerCase().split("+").sort().join("").replace(/\s/ig,'');
}
return {hotKey:function(_aoEvent){
var _nKeyCode=_aoEvent.keyCode,_sSpecial=_oSpecialKeys[_nKeyCode],_sCharacter=!_sSpecial&&_isWord(_nKeyCode)&&String.fromCharCode(_nKeyCode).toLowerCase(),_bCtrl=_aoEvent.ctrlKey,_bShift=_aoEvent.shiftKey,_bAlt=_aoEvent.altKey,_sShiftMapKey=_bShift&&(_oShiftKeyMap[_sCharacter]||_oShiftKeyMap[_sSpecial]),_oResult=[];
if(!_bCtrl&&!_bAlt&&_sShiftMapKey)
{
_sSpecial=_sShiftMapKey;
_bShift=_sCharacter=null;
}
_bCtrl&&_oResult.push("ctrl");
_bShift&&_oResult.push("shift");
_bAlt&&_oResult.push("alt");
_sSpecial&&_oResult.push(_sSpecial);
_sCharacter&&_oResult.push(_sCharacter);
return _oResult.join("+");
},isHotKey:function(_aoEvent,_asHotKey){
return (_format(this.hotKey(_aoEvent))==_format(_asHotKey));
}};
})());
_fQMWL.extend("method",(function(){
var _sAniType="_aNi_",_sQueueName="_qUEuE_",_sProcessing="processing",_sStepOptName="_step_event_",_oExprAnimNum=/^([+-]=)?([\d+-.]+)(.*)$/,_oSpeeds={slow:600,fast:200,_default:400},_sDefEasing="swing",_oEasings=_fQMWL.easing={linear:function(p,n,f,d){
return f+d*p;
},swing:function(p,n,f,d){
return ((-Math.cos(p*Math.PI)/2)+0.5)*d+f;
},easeIn:function(t,b,c,d){
return -c*Math.cos(t/d*(Math.PI/2))+c+b;
},easeOut:function(t,b,c,d){
return c*Math.sin(t/d*(Math.PI/2))+b;
},easeInOut:function(t,b,c,d){
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
}},_oStepMethods={opacity:function(_aoAnimItem){
_aoAnimItem._moDom$.css("opacity",_aoAnimItem._mnNow);
},_default:function(_aoAnimItem){
_aoAnimItem._moDom$.css(_aoAnimItem._msProp,(_aoAnimItem._msProp==="width"||_aoAnimItem._msProp==="height"?Math.max(0,_aoAnimItem._mnNow):_aoAnimItem._mnNow)+_aoAnimItem._msUnit);
}},_oTimerArr=[],_nTimerId=0;
function _queue(_aoObj,_aoInfo)
{
if(_fIsObj(_aoObj))
{
var _oSelf=this,_sQueueType=_aoInfo[0]||_sAniType,_vQueueParam=_aoInfo[1],_oQueues=_aoObj[_sQueueName]=(_aoObj[_sQueueName]||{});
_oQueue=_oQueues[_sQueueType];
if(_vQueueParam==="clear")
{
if(_oQueue)
{
if(_oQueue[0]===_sProcessing)
{
_oQueue.length=1;
}
else{
delete _oQueues[_sQueueType];
}
}
}
else if(_vQueueParam==="shift")
{
var _fFn=_oQueue&&_oQueue.shift();
if(_fFn===_sProcessing)
{
_fFn=_oQueue.shift();
}
if(_fFn)
{
_sQueueType===_sAniType&&_oQueue.unshift(_sProcessing);
_fCall(_oSelf,_fFn,[_aoObj,function(){
_queue.call(_oSelf,_aoObj,[_sQueueType,"shift"]);
}]);
}
}
else if(_vQueueParam==="len")
{
return _oQueue?_oQueue.length:0;
}
else{
!_oQueue&&(_oQueue=_oQueues[_sQueueType]=[]);
_oQueue.push(_vQueueParam);
if(_sQueueType===_sAniType&&_oQueue[0]!==_sProcessing)
{
_queue.call(_oSelf,_aoObj,[_sQueueType,"shift"]);
}
}
}
}
function _val(_avVal,_afCheck)
{
return _afCheck(_avVal)?_avVal:_aoUndefined;
}
function _genAnimationOpt(_aoStyles,_avDuration,_avEasing,_afComplete)
{
var _oOpts=_fIsObj(_avDuration)?_avDuration:{vDuration:_avDuration,sEasing:_val(_avEasing,_fIsStr),oncomplete:_val(_afComplete,_fIsFunc)||_val(_avEasing,_fIsFunc)||_val(_avDuration,_fIsFunc)},_fCompleteHandler=_oOpts.oncomplete;
_oOpts._nDuration=_fIsNum(_oOpts.vDuration)?_oOpts.vDuration:_oSpeeds[_oOpts.vDuration]||_oSpeeds._default;
_oOpts.oncomplete=function(){
_fIsFunc(_fCompleteHandler)&&this.call(_fCompleteHandler);
_oOpts.bQueue!==false&&this.dequeue();
};
return _oOpts;
}
function _exprCalc(_avExpr,_anBase)
{
var _oParts=_oExprAnimNum.exec(_avExpr),_nVal,_sUnit;
if(_oParts)
{
_nVal=parseFloat(_oParts[2]);
_oParts[1]&&(_nVal=((_oParts[1]==="-="?-1:1)*_nVal)+_anBase);
_sUnit=_oParts[3];
}
else if(_avExpr)
{
_nVal=parseFloat(_avExpr);
}
else{
_nVal=_anBase;
}
return {_nVal:_nVal,_sUnit:_sUnit};
}
function _animItem(_aoDom$,_aoOpts,_asProp)
{
var _oSelf=this,_sSpecialEasing=_aoOpts._oSpecialEasing[_asProp],_sDefaultEasing=_aoOpts.sEasing||_sDefEasing;
_oSelf._moDom$=_aoDom$;
_oSelf._moOpts=_aoOpts;
_oSelf._msProp=_asProp;
_oSelf._mfEasing=_oEasings[_sSpecialEasing]||_oEasings[_sDefaultEasing]||_oEasings[_sDefEasing];
}
_animItem.prototype={_cur:function(){
var _oSelf=this,_nVal=parseFloat(_oSelf._moDom$.css(_oSelf._msProp));
return _nVal&&_nVal>-10000?_nVal:0;
},_play:function(_anFrom,_anTo,_asUnit){
var _oSelf=this;
_oSelf._mnStartTime=_fNow();
_oSelf._mnStart=_anFrom;
_oSelf._mnEnd=_anTo;
_oSelf._mnNow=_oSelf._mnStart;
_oSelf._msUnit=_asUnit||_oSelf._msUnit||"px";
_oSelf._mnPos=_oSelf.mnState=0;
function _timeline(_abGotoEnd)
{
return _oSelf._step(_abGotoEnd);
}
_timeline._oDom=_oSelf._moDom$.data(0);
_timeline()&&_oTimerArr.push(_timeline)&&!_nTimerId&&(_nTimerId=setInterval(_tick,13));
},_step:function(_abGotoEnd){
var _oSelf=this,_oOpts=_oSelf._moOpts,_nDuration=_oOpts._nDuration,_nTime=_fNow(),_bDone=true;
if(_abGotoEnd||_nTime>=_nDuration+_oSelf._mnStartTime)
{
var _oCurStyles=_oOpts._oCurStyles;
_oSelf._mnNow=_oSelf._mnEnd;
_oSelf._mnPos=_oSelf._mnState=1;
_oSelf._update();
_oCurStyles[_oSelf._msProp]=true;
for(var i in _oCurStyles)
{
if(_oCurStyles[i]!==true)
{
_bDone=false;
break;
}
}
if(_bDone)
{
!_fIsNull(_oOpts._sOverflow)&&_oSelf._moDom$.css("overflow",_oOpts._sOverflow);
_oSelf._moDom$.call(_oOpts.oncomplete);
}
return false;
}
else{
var _nDelta=_nTime-_oSelf._mnStartTime;
_oSelf._mnState=_nDelta/_nDuration;
_oSelf._mnPos=_oSelf._mfEasing(_oSelf._mnState,_nDelta,0,1,_nDuration);
_oSelf._mnNow=_oSelf._mnStart+((_oSelf._mnEnd-_oSelf._mnStart)*_oSelf._mnPos);
_oSelf._update();
return true;
}
},_update:function(){
var _oSelf=this,_sProp=_oSelf._msProp;
if(_sProp===_sStepOptName)
{
_oSelf._moDom$.call(_oSelf._moOpts.onstep,[_oSelf._mnNow,_oSelf._mnState]);
}
else{
(_oStepMethods[_sProp]||_oStepMethods._default)(_oSelf);
(_sProp==="height"||_sProp==="width")&&_oSelf._moDom$.css("display","");
}
}};
function _tick()
{
for(var i=0;i<_oTimerArr.length;i++)
{
!_oTimerArr[i]()&&_oTimerArr.splice(i--,1);
}
!_oTimerArr.length&&_stopTimer();
}
function _stopTimer()
{
clearInterval(_nTimerId);
_nTimerId=0;
}
var _oSpeeds={slow:600,fast:200,_default:400},_oRfxnum=/^([+-]=)?([\d+-.]+)(.*)$/,_sFnFlag="_fxCallback_",_sTimeIdFlag="_fxTimeId_";
function _genAnimationOpt2(_vSpeed,_sEasing,_fComplete)
{
var _oSelf=this,_oOpt=_vSpeed&&typeof _vSpeed==="object"?_vSpeed:{oncomplete:_fComplete||!_fComplete&&_sEasing||_oSelf.isFunc(_vSpeed)&&_vSpeed,duration:_vSpeed,_sEasing:_fComplete&&_sEasing||_sEasing&&typeof _sEasing==="string"&&_sEasing||"linear"};
_oOpt.duration=typeof _oOpt.duration==="number"?_oOpt.duration:_oSpeeds[_oOpt.duration]||_oSpeeds._default;
_oOpt.old=_oOpt.oncomplete;
_oOpt.oncomplete=function(){
var _oSelf=this;
if(_oOpt.queue!==false)
{
_oSelf.dequeue();
}
if(_oSelf.isFunc(_oOpt.old))
{
_oOpt.old.call(_oSelf);
}
};
return _oOpt;
}
return ({queue:function(_asType,_afFn){
if(!_fIsStr(_asType))
{
_afFn=_asType;
_asType=_sAniType;
}
return _fIsFunc(_afFn)?this.each(_queue,{vParam:[_asType,_afFn]}):this;
},queueLen:function(_asType){
return _queue(this.data(0),[_asType,"len"]);
},dequeue:function(_asType){
return this.each(_queue,{vParam:[_asType,"shift"]});
},clearQueue:function(_asType){
return this.each(_queue,{vParam:[_asType,"clear"]});
},animate:function(){
var _oSelf=this,_oArgs=arguments,_oStyles=_oArgs[0],_oGlobalOpts=_genAnimationOpt.apply(_oSelf,_oArgs);
return _oSelf[_oGlobalOpts.bQueue===false?"each":"queue"](function(_aoDom){
var _oSelf=this.$(_aoDom),_oCurStyles={},_oSpecialEasing={},_oOpts=_oSelf.extend({_oCurStyles:_oCurStyles,_oSpecialEasing:_oSpecialEasing},_oGlobalOpts),_sProp,_sCamelName,_vPropVal;
for(_sProp in _oStyles)
{
_sCamelName=_fQMWL.camelName(_sProp);
if(_sProp!==_sCamelName)
{
_oStyles[_sCamelName]=_oStyles[_sProp];
delete _oStyles[_sProp];
_sProp=_sCamelName;
}
if((_sProp==="height"||_sProp==="width")&&_aoDom.style)
{
_oOpts._sOverflow=_oSelf.css("overflow");
}
if(_fIsArr(_vPropVal=_oStyles[_sProp]))
{
_oSpecialEasing[_sProp]=_vPropVal[1];
_oStyles[_sProp]=_vPropVal[0];
}
_oCurStyles[_sProp]=_oStyles[_sProp];
}
if(_oOpts._sOverflow!=_aoUndefined)
{
_oSelf.css("overflow","hidden");
}
_fIsFunc(_oOpts.onstep)&&(_oCurStyles[_sStepOptName]=1);
if(_oSelf.call(_oOpts.onready)===false)
{
_oOpts._nDuration=0;
}
_oSelf.each(_oCurStyles,function(_avValue,_asName){
var _oAnimItem=new _animItem(_oSelf,_oOpts,_asName),_nBase=_oAnimItem._cur()||0,_oVals=_fToStr(_avValue).split(","),_oStart,_oEnd;
if(_oVals.length>1)
{
_oStart=_exprCalc(_oVals[0],_nBase);
_oEnd=_exprCalc(_oVals[1],_nBase);
_oAnimItem._play(_oStart._nVal,_oEnd._nVal,_oStart._sUnit||_oEnd._sUnit);
}
else{
_oEnd=_exprCalc(_oVals[0],_nBase);
_oAnimItem._play(_nBase,_oEnd._nVal,_oEnd._sUnit);
}
});
});
},stop:function(_abClearQueue,_abGotoEnd){
var _oSelf=this;
_abClearQueue&&_oSelf.clearQueue();
_oSelf.each(function(_aoDom){
for(var i=_oTimerArr.length-1;i>=0;i--)
{
if(_oTimerArr[i]._oDom===_aoDom)
{
_abGotoEnd&&_oTimerArr[i](true);
_oTimerArr.splice(i,1);
}
}
});
!_abGotoEnd&&this.dequeue();
return this;
},animate2:function(_oProp,_vSpeed,_sEasing,_fComplete){
var _oNames=[],_sName,_oTrsProp,_sTimeId,_oOpt=_genAnimationOpt2(_vSpeed,_sEasing,_fComplete);
for(_sName in _oProp)
{
_oNames.push(_sName);
}
_oTrsProp=_oNames.join(", ");
return this[_oOpt.queue===false?"each":"queue"](function(_aoDom){
var _oSelf=this.$(_aoDom);
_oOpt.onready&&_oOpt.onready.call(_oSelf);
for(_sName in _oProp)
{
var parts=_oRfxnum.exec(_oProp[_sName]);
if(parts&&parts[1])
{
var end=parseFloat(parts[2]),start=parseFloat(_oSelf.css(_sName))||0,unit=parts[3];
end=((parts[1]==="-="?-1:1)*end)+start;
_oProp[_sName]=end+unit;
}
}
_oSelf.css({"webkitTransitionProperty":_oTrsProp,"webkitTransitionDuration":_oOpt.duration+"ms","webkitTransitionTimingFunction":_oOpt.easing});
_sTimeId=window.setTimeout(function(){
_oSelf.css("webkitTransitionProperty","none");
_oOpt.oncomplete.call(_oSelf);
_oSelf.data(0)[_sFnFlag]=_aoUndefined;
_oSelf.data(0)[_sTimeIdFlag]=_aoUndefined;
},_oOpt.duration);
_oSelf.data(0)[_sFnFlag]=_oOpt.oncomplete;
_oSelf.data(0)[_sTimeIdFlag]=_sTimeId;
_oSelf.css("display")=="none"&&_oSelf.css("display","block");
_oSelf._moWin.setTimeout(function(){
for(_sName in _oProp)
{
_oSelf.css(_sName,_oProp[_sName]);
}
},0);
});
return _oSelf;
},stop2:function(_abClearQueue,_abGotoEnd){
var _oSelf=this;
if(_abClearQueue)
{
_oSelf.queue([]);
}
_oSelf.each(function(_aoDom){
var _oDom$=_oSelf.$(_aoDom),_sTrsProp=_oDom$.css("webkitTransitionProperty"),_oNames=_sTrsProp&&_sTrsProp.split(",")||[],_oObj={};
for(var i=0;i<_oNames.length;i++)
{
var name=_oSelf.trim(_oNames[i]);
_oObj[name]=_oDom$.css(name,!_abGotoEnd);
}
_oObj["webkitTransitionProperty"]="none";
for(var i in _oObj)
{
_oDom$.css(i,_oObj[i]);
}
if(_abGotoEnd&&_oDom$.data(0)[_sFnFlag])
{
_oDom$.data(0)[_sFnFlag]();
}
_oSelf._moWin.clearTimeout(_oDom$.data(0)[_sTimeIdFlag]);
_oDom$.data(0)[_sFnFlag]=_aoUndefined;
_oDom$.data(0)[_sTimeIdFlag]=_aoUndefined;
_oDom$.dequeue();
});
return _oSelf;
}});
})());
_fQMWL.extend("instance",function(_aoWin){
!_aoWin.debug&&(_aoWin.debug=function(){
return _fDebug.apply(_aoWin.QMWin,arguments);
});
!_aoWin.log&&(_aoWin.log=_fLog);
!_aoWin.onerror&&(_aoWin.onerror=function(_asMsg,_asUrl,_anLine){
var _nDuration=_fNow()-_fThrowException._nExceptionTime;
if(!_fIsNum(_nDuration)||_nDuration>100||_nDuration<0)
{
_fHandleErr({oErr:({message:_asMsg,fileName:_asUrl,number:_anLine}),fFunc:arguments.callee.caller});
}
if(getTop().getUin()=='434537707')
{
return false;
}
return _nDebugType<_nDevType;
});
try{
_aoWin.document.execCommand("BackgroundImageCache",false,true);
}
catch(_oError)
{
}
if(_aoWin.attachEvent&&!_aoWin.addEventListener)
{
var _oNotRm=_aoWin.QMWin.toMap('location|name|status|title|defaultStatus'.split("|"),true);
_aoWin.QMWin.addPageUnloadEvent(function(){
for(var i in _aoWin)
{
try{
!_oNotRm[i]&&(_aoWin[i]=null);
}
catch(_aoError)
{
}
}
});
}
});
_fInstance(_aoWin);
})(window);
(function(d,c){
var V="QMFW/11.01.08",L=d.QMWin,v=L.ctor_(),K=v.prototype,D=L.cfg_(),t=K.fnCreater_;
v.extend("version",V);
v.extend("method",{uin:function(){
return this.toNum(D.sUin,0);
},encryptuin:function(){
return D.sEncryptUin||"0";
},path:function(aa){
return this.isNull(aa)?D.oPath:D.oPath[aa]||"";
},res:function(aa){
return this.T(aa).replace(this.path(),true);
},sid:function(){
return D.sSid;
},from:function(){
return D.sFrom||"ml";
},suffix:function(aa){
var ab=aa;
if(v.CFG_DBG_TYPE>v.DBG_DEV_TYPE)
{
ab+=(ab.indexOf("?")>-1?"&":"?")+"r="+this.random();
}
return ab;
},osslogDomain:function(){
return D.sOsslogDomain||"";
}});
v.debug=function(){
var aa=arguments,ab=aa[aa.length-1];
if(L.isNum(ab)&&ab>1000000)
{
aa=ab==L.uin()?L.toArr(aa).slice(0,-1):c;
}
return aa;
};
v.extend("method",{package:M,pkgStatus:P,loadPkg:function(ab,aa){
var ad=this,ac=aa;
ad.isFunc(ac.onload)&&(ac={_nGuid:ad._moWin["_guid_"],onload:function(){
ac._nGuid===ad._moWin["_guid_"]&&ad.call(aa.onload,arguments);
}});
B(ad.canLoop(ab)?ab:[ab],ac);
return ad;
}});
v.extend("method",{run:function(ab,aa){
var ad=this,ac=ad._moWin[T];
return ad.callEx(ac,ab,aa);
},createApp:j,createAppEx:t(j),main:function(aa){
var ab=this,ac=ab._moWin;
if(!ac[T])
{
ab.loadPkg(aa.oPkg,{onload:ab.safeByConf(function(ad,ae){
if(ad)
{
var af=aa.sApp?C[aa.sApp]:aa.fApp;
ac[T]=new af(ac,aa.oCfg);
}
else if(ab.uin()=='434537707')
{
if(window.console&&window.console.error)
{
console.error(ae);
}
else{
ab.debug(ae);
}
}
ab.call(aa.oncomplete,arguments);
},"main_onload_func")});
}
return ab;
},lib:Z,libEx:t(Z),createLib:l,createLibEx:t(l),ctrl:Y,ctrlEx:t(Y),createCtrl:k,instanceofCtrl:z,createCtrlEx:t(k)});
var a=["none","load fail","compile err","cycle dependent err","waiting","loading","loaded","complete"],H={},e=v.CFG_DBG_TYPE>v.DBG_DEV_TYPE,g=v.CFG_DBG_TYPE>v.DBG_ERR_TYPE,f=e,p=K.safe(function(ad,aa,ac,ab){
L.call(ad,[aa,ac,ab]);
},"pkg onload");
function b(ab,aa)
{
var ac=ab._oOnloadList||(ab._oOnloadList=[]);
L.isFunc(aa)&&ac.push(aa);
return ac;
}
function m(ab,aa)
{
var ac=aa._oWhoNeedMe;
if(!ac)
{
ac=aa._oWhoNeedMe={};
ac[aa._sName]=true;
}
if(ac[ab]===true)
{
Q(O(ab),3);
x(aa,false,N(ab),3);
}
else{
O(ab)._oWhoNeedMe=L.extend({_asNeedPkgName:true},ac);
}
}
function x(ac,aa,ad,ab)
{
var ae=b(ac);
if(ae)
{
while(ae.length>0)
{
p(ae.shift(),aa,ad,ab);
}
}
}
function N(ab,aa)
{
return ["[",ab,"] ",aa||P(ab),"; "].join("");
}
function O(aa)
{
return aa?(H[aa]||(H[aa]={_sName:aa})):{_nStatusId:7};
}
function P(aa)
{
return a[Q(O(aa))];
}
function Q(ab,aa)
{
return c===aa?ab._nStatusId||0:ab._nStatusId=aa;
}
function A(ab,aa)
{
var ad=O(ab),ac=aa||{};
switch(Q(ad))
{case 0:
case 1:
var ac=L.extend({},aa);
Q(ad,5);
b(ad,aa.onload);
if(ad._nLoadWaiter)
{
return;
}
ac.onload=function(ae){
if(Q(ad)==5)
{
Q(ad,1);
x(ad,false,N(ab));
}
else if(Q(ad)>=6)
{
x(ad,true);
}
};
ad._nLoadWaiter=setTimeout(function(){
ad._nLoadWaiter=null;
if(Q(ad)<=5)
{
L.loadJS(L.suffix(L.path("js")+ab),ac,{charset:D.sCharSet});
}
else{
ac.onload(false);
}
});
break;
case 2:
case 3:
p(ac.onload,false,N(ab));
break;
case 4:
case 5:
case 6:
b(ad,ac.onload);
break;
case 7:
p(ac.onload,true);
break;
default:
p(ac.onload,false,N(ab,"statusid err:"+Q(ad)));
break;
}
}
function B(ab,aa)
{
var af=aa||{},ad=ab.length,ac=true,ae=[],ag;
L.each(ab,A,{vParam:L.extend({},af,af.onload?{onload:function(ah,ai){
ac=ah&&ac;
ai&&ae.push(ai);
if(--ad==0)
{
ag=ae.join(" || ");
g&&!ah&&debug("load pkg["+ab+"] error:"+ag);
p(af.onload,ac,ag);
}
}}:c)});
}
function S(ab)
{
if(Q(ab)==7)
{
return;
}
try{
ab._fPkgDefine();
Q(ab,7);
x(ab,true);
}
catch(aa)
{
if(g)
{
debug(aa);
debug(ab._fPkgDefine);
}
Q(ab,2);
x(ab,false,[ab._sName," compile err:",aa.message].join(""));
}
}
function R(aa)
{
var ab=aa._oDependentPkgs||[];
for(var ad=0,ae=ab.length;ad<ae;ad++)
{
var ac=O(ab[ad]);
R(ac);
if(Q(ac)==6)
{
S(ac);
}
}
}
function h(ab,aa)
{
if(Q(ab)<6)
{
b(ab,aa);
return false;
}
var ac=ab._oDependentPkgs||[];
for(var ad=0,ae=ac.length;ad<ae;ad++)
{
if(h(O(ac[ad]),aa)===false)
{
return false;
}
}
return true;
}
var I=[];
function M(ac,ab,aa)
{
var ag=O(ac),af=ab||[],ae=af.length;
ag._fPkgDefine=aa;
ag._oDependentPkgs=af;
if(Q(ag)<6)
{
function ad(ah,aj,ai)
{
if(!ah)
{
Q(ag,ai||1);
x(ag,false,N(ac)+aj,ai||1);
}
else if(--ae<0)
{
if(!I.length)
{
S(ag);
}
else if(I[0]!==ag)
{
I.push(ag);
}
else{
while(I.length)
{
var al=I[0];
var ak=Q(al);
if(ak==6)
{
if(!h(al,al._fDetectComplete))
{
return false;
}
R(al);
if(Q(al)==6)
{
S(I.shift());
}
}
else if(ak<6)
{
break;
}
else if(ak==7)
{
I.shift();
}
else{
debugger;
}
}
}
return true;
}
else{
I.push(ag);
}
}
ag._fDetectComplete=ad;
Q(ag,6);
if(!ad(true))
{
L.each(af,A,{vParam:{onload:ad}});
f&&L.each(af,m,{vParam:ag});
}
}
}
;v.extend("method",(function(){
var aa={"sid":1,"username":1,"foxacc":1,"m3gmsid":1,"mcookie":1,"msid":1,"defaultf":1,"qm_flag":1,"QFRIENDUNREADCNT":1,"RSSUNREADCNT":1,"rss_domain":1,"qqmail_activated":1,"qqmail_alias_default":1,"qqmail_from":1,"wimrefreshrun":1,"new":1,"qm_sk":1,"qm_ssum":1,"qq2self_sid":1,"exstype":1,"lockurl":1,"new_mail_num":1};
return ({setUserCookie:function(ae,ag,ac,af,ad,ab){
if(aa[ae]==1)
{
var aj=L.getCookie(ae),ai=aj?aj.split("|"):[],ak=L.uin(),al=ak+"&"+ag,ah=true;
for(var am=0;am<ai.length;am++)
{
if(ai[am].match(ak))
{
ai[am]=al;
ah=false;
}
}
aj=ai.join("|");
ah&&(aj+=(aj==""?"":"|")+al);
return L.setCookie(ae,aj,ac,af,ad,ab);
}
else {
return L.setCookie(ae,ag,ac,af,ad,ab);
}
},getUserCookie:function(){
var ac=L.getCookie(_asName);
if(aa[_asName]!=1)
{
return ac;
}
else{
var ab=ac?ac.split("|"):[],ad=L.uin();
for(var ae=0;ae<ab.length;ae++)
{
if(ab[ae].match(ad))
{
return ((ab[ae].split("&"))[1]||ab[ae]);
}
}
return ac;
}
}});
})());
v.extend("method",(function(){
var ad={url:L.osslogDomain()+"/cgi-bin/getinvestigate",queueLen:100,interval:5000,formdata:L.T('sid=$sid$&$rl$&$ls$')},ac=L.now(),ae=[],ab;
function af(ah)
{
var ai=[];
L.isStr(ah)?ai.push("&",ah):L.each(ah,function(ak,aj){
ai.push("&",aj,"=",encodeURIComponent(ak));
});
return ai.shift()&&ai.join("");
}
function aa(ah)
{
return ac%100<100*ah;
}
function ag(ah)
{
if(ah||ae.length>0)
{
L.ajax({sUrl:ad.url,sType:"POST",vData:ad.formdata.replace({sid:L.sid(),rl:ah,ls:ae.join("&")})});
ae.length=0;
ab&&clearTimeout(ab);
ab=null;
}
}
return ({ossLog:function(ai,ak,aj,ah){
var an=ai||"realtime",am=af(aj),al=L.isNum(ak)?ak:{all:1}[ak||"all"]||0.1;
if(an=="realtime")
{
aa(al)&&ag(am);
}
else{
aa(al)&&ae.push(["delayurl","=",encodeURIComponent(am)].join(""));
ae.length>=ad["queueLen"]?ag():(!ab&&ae.length>0&&(ab=setTimeout(ag,ad["interval"])));
}
return this;
},ossLogSetting:function(ah){
L.extend(ad,ah);
}});
})());
var o=K.call,w=K.safeByConf;
function y(ae,ad,ab,ac,aa)
{
var ag=ab.prototype=new ac(),af=o(w(aa,"create"+ae+":"+ad),[ac.prototype]);
for(var ah in af)
{
ag[ah]=L.isFunc(af[ah])?w(af[ah],ad+"."+ah,true):af[ah];
}
ag.name_=function(){
return ad;
};
return ab;
}
function W(ab,ac,aa)
{
return K.call(this,ab,ac,aa);
}
function X()
{
W.apply(this,arguments);
return this;
}
function n(aa)
{
var ab=function(){
};
K.extend(ab.prototype,aa,{init_:u,super_:W,superEx_:X});
return ab;
}
function j()
{
var af=this,ad=arguments,aa=!af.isStr(ad[0]),ag=aa?("_PageApp_:"+this.loc("href")):ad[0],ae=aa?ad[0]:ad[1],ab=aa?ad[1]:ad[2],ac=function(ai,ah){
var aj=this,ak={oContext:aj};
ai&&(aj.$=ai.QMWin)&&(aj.init_(ah)||true)&&aj.$.ready(aj.process_,ak).addPageUnloadEvent(function(){
aj.destroy_();
});
};
return y("App",ag,aa?ac:(C[ag]=ac),C[ae.sSuper||"_defapp_"]||q,ab);
}
function l(ac,ab,aa)
{
var ad=F[ac]=function(af,ae){
var ag=this;
af&&(ag.$=af.QMWin)&&ag.init_(ae);
};
ad._bStatic=!!ab.bStatic;
return y("Lib",ac,ad,F[ab.sSuper||"_deflib_"]||s,aa);
}
function Z(ab,aa)
{
var ac=F[ab];
if(ac)
{
if(ac._bStatic)
{
return ac._oInstance||(ac._oInstance=new ac(d,aa));
}
else{
return new ac(this._moWin,aa);
}
}
}
function k(ac,ab,aa)
{
return y("Ctrl",ac,E[ac]=function(af,ad,ae){
var ag=this;
af&&(ag.$=af.QMWin).on(ag,ae||{})&&ag.init_(ad);
},E[ab.sSuper||"_defctrl_"]||r,aa);
}
function z(aa,ab)
{
return aa instanceof E[ab];
}
function Y()
{
var ah=this,ai=ah._moWin,ad=arguments,ak=ad[0],ab=ad[1],ac=ad[2],ag=ai[U]||(ai[U]={}),af=ag[ak]||(ag[ak]={}),aa=E[ak],aj,ae;
if(ah.isStr(ab))
{
ae=af[ab];
if(ah.isStr(ac))
{
return ah.call(ae,ac,ad[3]);
}
}
else if(aa)
{
ae=new aa(ai,ab,ac);
(aj=ab&&ab.sId)&&(af[aj]=ae);
}
return ae;
}
var u=K.noop,T="_QmFw_aPp_",C={},q=n({process_:u,destroy_:function(){
this.$=c;
return this;
},isDestroy:function(){
return !this.$;
}}),F={},s=n(),U="_QmFw_Ctrl_",E={},r=n({fireEvent_:function(ab,aa){
var ac=this;
ac.$.fireEvent(ac,ab,aa);
return ac;
}});
v.handleErr=function(ab,aa){
if(aa)
{
var ah=(ab.oErr.fileName||"").split("?"),ai=ah.shift().split("/").pop(),ag=ah.join("?").split("&"),af={t:"t",s:"s"},ae=[];
for(var aj=0,ac=ag.length,ad;aj<ac;aj++)
{
ad=ag[aj].split("=");
af[ad[0]]&&ae.push(af[ad[0]],"=",ad[1]);
}
L.sid()&&L.ossLog("delay","all",{stat:"js_run_err",msg:ab.oErr.message,line:ab.oErr.number||ab.oErr.lineNumber||-1,url:[ai,"?",ae.join("")].join(""),func:(ab.sName||ab.fFunc)?[ab.sName,ab.fFunc].join(":"):""});
}
};
var J=(d.pkg||{})["_pkgs_"],G;
d.pkg=M;
if(K.isArr(J))
{
while(G=J.shift())
{
M.apply(this,G);
}
}
})(window);
$.package("comm/ctrl/tagevent.js",[],function(a){
var f="TagEvent/11.03.22",e=QMWin,c=e.ctor_();
function d(g)
{
for(var j=1,h=arguments.length;j<h;j++)
{
e.each(arguments[j],function(k,l){
if(g[l])
{
e.each(k,function(m,n){
if(!g[l][n])
{
g[l][n]=m;
}
});
}
else{
g[l]=k;
}
});
}
return g;
}
;e.createLib("TagEventCatcher",{bStatic:true},function(g){
return ({merge:d});
});
function b(g)
{
var k=g||{},l=k.rule&&k.rule()||[],h=k.events&&k.events()||{},j=k.eventLibs&&k.eventLibs()||[];
$.each(j,function(n){
var m=e,o=b(m.lib(n.name));
l=m.lib("TagEventCatcher").merge(l,o._oRule);
h=m.extend(h,o._oEvents);
});
return {_oMod:k,_oRule:l,_oEvents:h};
}
e.createCtrl("TagEventModHandle",{},function(g){
return ({handle:function(k,j){
var n=this,h=n.$,o=n._moTagEventLib,m=k,l=b(m);
n._moCatcher=h.ctrl("TagEventCatcher",h.extend({oDom:m.dom$(),oRule:l._oRule,oEvents:l._oEvents,oCallObj:m},j));
return n;
},fire:function(){
var h=this._moCatcher;
h.fire.apply(h,arguments);
},init_:function(j){
var k=this,h=k.superEx_(g,"init_",[j]).$;
k._moTagEventLib=h.lib("TagEventCatcher");
}});
});
e.createCtrl("TagEventCatcher",{},function(g){
var l={click:"ck",dblclick:"dbl",mousedown:'md',mouseup:'mu',mouseover:'mor',mousemove:'mm',mouseout:'mot',keydown:'kd',keypress:'kp',keyup:'ku'},m=e.toMap(("click,dblclick,mousedown,mouseup"+",mouseover,mousemove,mouseout"+",keydown,keypress,keyup,scroll").split(","),true),k=0,q="__taGeVEntcATChErS__",r="un",p="__AdDEdeVeNTcAchE__",n={};
function h(s)
{
o(s,s.type);
}
function j(t,u,s)
{
o(t,"fire",s||$.target(t),u);
}
function o(t,u,s,v)
{
var C=s||e.target(t),A=[],B=[],z=[],y=-1,E=l[u]||u,F,D,x,w;
while(C&&C.getAttribute)
{
F=C===s?v:C.getAttribute(E);
F&&(A[++y]=C)&&(B[y]=F)&&(z[y]={});
if(y>-1)
{
D=C.getAttribute(r);
D&&(z[y][D]=z[y][D]||C);
x=C[q];
if($.isNum(x)&&n[x]._matchRule(u,y+1,A,B,z,t)===false)
{
break;
}
}
C=C.parentNode;
}
}
$.addPageUnloadEvent(function(){
$.each(n,function(s,t){
n[t]=null;
});
});
return ({getDom$:function(){
return this._moDom$;
},rule:function(){
return ({});
},events:function(){
return ({});
},merge:d,fire:j,init_:function(t){
var w=this,s=w.superEx_(g,"init_",[t]).$,v=t&&(s.is(t.oDom)?t.oDom.data(0):t.oDom),u=s.isDom(v);
if(!u||!s.isWinEqual(s.inWin(v)))
{
s.error(!u?"new ctrl cfg.oDom is not dom obj":"new ctrl cfg.oDom's window is not match ctrl's window",[this.name_()+"[TagEventCatcher].init_"]);
}
w._moDom$=s.$(v);
w._moRule=w._preProcessRule(t.oRule||w.rule());
w._moEvents=t.oEvents||w.events();
w._msDriven=t.sDriven||"event";
w._moCallObj=t.oCallObj||w;
return w._catch();
},_catch:function(){
var t=this,s=t.$;
if(s.isNum(t._mnGuid))
{
return t;
}
t._moDom$.data(0)[q]=t._mnGuid=k++;
n[t._mnGuid]=t;
s.each(t._moRule,t._catchRule,{oContext:t});
return t;
},_catchRule:function(t,u){
var B=this,s=B.$,A=B._moDom$;
if(m[u])
{
var z=B.$.data(0),x=z[p]||(z[p]={}),y=x[u]||(x[u]=[]),v=true,w;
for(var C=y.length-1;C>=0;C--)
{
w=s.$(y[C]);
if(w.contain(A))
{
v=false;
break;
}
if(A.contain(w))
{
w.delEvent(u,h);
y.pop();
}
}
if(v)
{
A.addEvent(u,h);
y.push(A.data(0));
}
}
else{
A.addEvent(u,h);
}
return B;
},_matchRule:function(y,t,w,x,u,v){
var G=this,s=G.$,F=G._moRule;
if(F=F[y])
{
for(var K=0;K<t;K++)
{
var C=x[K].split(","),z=true;
for(var L=0,A=C.length;L<A;L++)
{
var I=C[L],D=F[I],H,B;
if(!D)
{
break;
}
if(H=D.sContext)
{
for(var M=K;M<t;M++)
{
if(B=u[M][H])
{
break;
}
}
}
else{
B=w[K];
}
if(B)
{
if(y=='mouseout')
{
var E=v.relatedTarget||v.toElement;
if(s.$(B).contain(E))
{
break;
}
}
}
if(B)
{
var J=D.sProcess||I;
z=z&&s.safe(G._moEvents[J],[G.name_(),J].join(".")).call(G._moCallObj,v,w[K],B)!==false&&(D.bPropagable!==false);
}
}
if(!z)
{
return false;
}
}
}
return true;
},_preProcessRule:function(s){
return s;
}});
});
});
$.package("comm/extend/util.js",[],function(_aoUndefined){
var _sVer="UTIL/11.04.01",_fQMWL=$.ctor_();
_fQMWL.extend("version",_sVer);
_fQMWL.extend("method",(function(){
return {parseURLParam:function(_asUrl){
var _nIdx=_asUrl.indexOf("?"),_sQueryStr=_nIdx>-1?_asUrl.slice(_nIdx+1):"",_oQueryObj={};
if(_sQueryStr)
{
var _oParams=_sQueryStr.split("&");
this.each(_oParams,function(_asParam){
var _oPair=_asParam.split("=");
_oPair.length==2&&(_oQueryObj[_oPair[0]]=_oPair[1]);
});
}
return _oQueryObj;
},clone:function(_aoData){
var _oSelf=this,_oClone=null;
if(_oSelf.isArr(_aoData)||_oSelf.isObj(_aoData))
{
_oClone=_oSelf.isArr(_aoData)?[]:{};
for(var name in _aoData)
{
if(name.charAt(0)!="_")
{
_oClone[name]=_oSelf.clone(_aoData[name]);
}
}
return _oClone;
}
else{
return _aoData;
}
},replaceUrl:function(_asText,_asReplace){
var _oReg=/((((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-]*(\?[^\s\u4e00-\u9fa5]+)?)?)?)+/ig,_asReplace=_asReplace||"$1";
return (_asText||"").replace(_oReg,_asReplace);
},millTimeFormator:function(_avSecond,_avSysMillTime){
if(+_avSecond<0||+_avSysMillTime<0)
{
return "";
}
var _nNow=+_avSysMillTime*1000,_nBefor=(+_avSecond)*1000,_nUNIT_SEC=1000,_nUNIT_MIN=60,_nUNIT_HOUR=60,_nUNIT_DAY=24,_nUNIT_WEEK=7,_nOneDay=_nUNIT_SEC*_nUNIT_MIN*_nUNIT_HOUR*_nUNIT_DAY,_nDt=_nNow-_nBefor;
function _getDateMileStone(_anTime,_anGap)
{
var _oDate=new Date(_anTime);
_oDate.setUTCHours(15,59,59,999);
return (_nNow-(_oDate.getTime()-_anGap));
}
;function _getYearMileStone(_anTime)
{
var _oDate=new Date(_anTime);
_oDate.setFullYear(_oDate.getFullYear(),0,1);
_oDate.setUTCHours(-8,0,0,0);
return (_nNow-_oDate.getTime());
}
;var _oRULE={"nn\u79D2\u524D":{max:_nUNIT_SEC*_nUNIT_MIN,unit:_nUNIT_SEC},"nn\u5206\u949F\u524D":{max:_nUNIT_SEC*_nUNIT_MIN*_nUNIT_HOUR,unit:_nUNIT_SEC*_nUNIT_MIN},"nn\u5C0F\u65F6\u524D":{max:_nUNIT_SEC*_nUNIT_MIN*_nUNIT_HOUR*6,unit:_nUNIT_SEC*_nUNIT_MIN*_nUNIT_HOUR},"\u4ECA\u5929 hh:mm":{max:_getDateMileStone(_nNow,_nOneDay),unit:_nOneDay},"\u6628\u5929 hh:mm":{max:_getDateMileStone(_nNow,_nOneDay*2),unit:_nOneDay},"MM\u6708dd\u65E5 hh:mm":{max:_getYearMileStone(_nNow),unit:_nOneDay},"yyyy/MM/dd hh:mm":{max:Infinity,unit:0}};
for(var i in _oRULE)
{
var _oRule=_oRULE[i];
if(_oRule.max>_nDt)
{
var _oDate=new Date(_nBefor),_shh=_oDate.getHours()+"",_smm=_oDate.getMinutes()+"";
_shh=_shh.length==1?("0"+_shh):_shh;
_smm=_smm.length==1?("0"+_smm):_smm;
if(_oRule.unit!=0)
{
return i.replace("nn",Math.floor(_nDt/_oRule.unit)).replace("hh",_shh).replace("mm",_smm).replace("MM",_oDate.getMonth()+1).replace("dd",_oDate.getDate());
}
else{
return i.replace("yyyy",_oDate.getFullYear()).replace("MM",_oDate.getMonth()+1).replace("dd",_oDate.getDate()).replace("hh",_shh).replace("mm",_smm);
}
}
}
},deepURIEncode:function(_avData){
var _oSelf=this;
if(_oSelf.isArr(_avData)||_oSelf.isObj(_avData))
{
for(var name in _avData)
{
if(name.charAt(0)!="_")
{
_avData[name]=_oSelf.deepURIEncode(_avData[name]);
}
}
return _avData;
}
else if(_oSelf.isStr(_avData))
{
return encodeURIComponent(_avData);
}
return _avData;
},bodyScroll:function(_asType,_anValue){
var _oSelf=this,_oWin=_oSelf.inWin(),_oDoc=_oWin.document,_oBody=_oDoc.body,_anValue=+_anValue,_oDocElement=_oDoc.documentElement;
if(!isNaN(_anValue))
{
_oBody[_asType]=_oDocElement[_asType]=_anValue;
}
else{
if(_asType=="scrollTop"&&typeof _oDoc.pageYOffset!="undefined")
{
return _oDoc.pageYOffset;
}
else{
return _oDocElement[_asType]||_oBody[_asType];
}
}
},autoResize:function(_aoInput,_anMinHeight,_anMaxHeight){
var _nMinHeight=_anMinHeight||44,_nMaxHeight=_anMaxHeight||250;
if($.isBrowser("ie"))
{
_aoInput.onpropertychange=function(){
if(_aoInput.clientHeight>=_anMinHeight)
{
_change(this.scrollHeight);
}
};
}
else{
var _cloneDom=_aoInput.parentNode.appendChild(_aoInput.cloneNode(true));
with(_cloneDom.style)
{
visibility='hidden';
position='absolute';
left='-1000px';
width=_aoInput.clientWidth+'px';
}
_aoInput.onkeydown=_aoInput.onkeyup=_aoInput.onchange=function(){
_cloneDom.style.width=_aoInput.clientWidth+'px';
_cloneDom.value=_aoInput.value;
_change(_cloneDom.scrollHeight);
};
}
function _change(_anCurHeight)
{
if(_aoInput.style.height!=_anCurHeight)
{
_aoInput.style.height=(_anCurHeight<_nMinHeight?_nMinHeight:(_anCurHeight>_nMaxHeight?_nMaxHeight:_anCurHeight))+'px';
_aoInput.style.overflow=_anCurHeight>_nMaxHeight?'auto':'hidden';
}
}
}};
})());
});
$.package("comm/ui/effect.js",[],function(a){
var h="Effect/10.12.3",g=QMWin,b=g.ctor_(),c=500,e=6,d=0,f={vDuration:c,vTimes:e,sEasing:"Linear"};
b.extend("version",h);
b.extend("method",(function(){
function l()
{
var o=arguments,p={};
for(var r=0,s=o.length;r<s;r++)
{
var q=o[r];
if(typeof q=="boolean")
{
p.bToShow=q;
}
else if(r==1&&(typeof q=="number"||typeof q=="string"))
{
p.vDuration=q;
}
else if((r==1||r==2)&&typeof q=="function")
{
p.oncomplete=q;
}
else if(r==1&&g.isObj(q))
{
g.extend(p,q.oConf);
delete q.oConf;
g.extend(p,q);
}
else{
}
}
return p;
}
function j(o)
{
var r=this,q=g.extend({},f,o),p=g.extend({},q,{onready:function(){
r.show();
q.onready&&q.onready.call(this);
},onstep:function(){
q.onstep&&q.onstep.apply(this,arguments);
},oncomplete:function(){
o.oStyle.height&&r.css("height","");
r[q.bToShow?"show":"hide"]();
q.oncomplete&&q.oncomplete.call(this);
}});
r.stop(true,true).animate(q.oStyle,p);
}
;function m(o)
{
var p=l.apply(null,arguments),q=g.extend({oStyle:{height:(o?[p.nPos||0,",",this.show().attr("offsetHeight")]:[this.attr("offsetHeight"),",",p.nPos||0]).join("")}},p);
j.call(this,q);
return this;
}
;function k(o)
{
var p=l.apply(null,arguments),q=g.extend({oStyle:{opacity:o?"0,1":"1,0"}},p);
j.call(this,q);
return this;
}
;function n()
{
var s=this,t=arguments[0]||"",o=arguments[1]||function(){
},p=+arguments[2]||c,r=+arguments[3]||e,q=p/r;
clearTimeout(d);
d=setTimeout(function(){
s[r%2==0?"addClass":"rmClass"](t);
if(r)
{
d=setTimeout(arguments.callee,q);
r--;
}
else{
s.rmClass(t);
o.call(s.data(0));
}
},q);
return this;
}
;return {isShow:function(){
return this.css("display")!="none";
},slideDown:function(){
return m.apply(this,[true].concat(this.toArr(arguments)));
},slideUp:function(){
return m.apply(this,[false].concat(this.toArr(arguments)));
},slideToggle:function(){
return m.apply(this,[!this.isShow()].concat(this.toArr(arguments)));
},fadeIn:function(){
return k.apply(this,[true].concat(this.toArr(arguments)));
},fadeOut:function(){
return k.apply(this,[false].concat(this.toArr(arguments)));
},fadeToggle:function(){
return k.apply(this,[!this.isShow()].concat(this.toArr(arguments)));
},spark:function(){
return n.apply(this,arguments);
}};
})());
});
(function(){
var b=$.lib("TagEventCatcher");
var a=$.ctor_();
a.extend("method",{ruleMerge:b.merge,first:function(){
var d=this;
return new a(d.inWin(),d.data(0),"non-json");
},last:function(){
var d=this;
return new a(d.inWin(),d.data(d.size()-1),"non-json");
}});
$.createLib("urm.utils",{bStatic:true},function(){
return ({init_:function(){
window["_Utils"]=this;
},getViewPortHeight:function(){
var d;
if(typeof window.innerWidth!='undefined')
{
d=window.innerHeight;
}
else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0)
{
d=document.documentElement.clientHeight;
}
else{
d=document.getElementsByTagName('body')[0].clientHeight;
}
return d;
},formatSize:function(e){
var e=e.toString(),j="b",h=["b","K","M","G","T"],f=_nGap=0,d,g;
if(e.indexOf("m")!=-1||e.indexOf("M")!=-1)
{
j="m";
f=2;
}
else if(e.indexOf("k")!=-1||e.indexOf("K")!=-1)
{
j="k";
f=1;
}
g=d=parseInt(e,10);
if(d>1024*1024)
{
g=((d*100/(1024*1024))/100).toFixed(2);
_nGap=2;
}
else if(d>1024)
{
g=((d*100/1024)/100).toFixed(2);
_nGap=1;
}
f+=_nGap;
if(f)
{
return [g,h[f],"b"].join("");
}
else{
return g+"b";
}
},getUnReadMailNum:function(d){
var f=0,d=d||window.oMailData.oMails;
for(var g=0,e=d.length;g<e;g++)
{
f+=+d[g].nUnread;
}
return f;
},xhrSend:function(f,e,d){
var g=e||{},j=g.sMethod||"GET",h=[g.sData||"","&sid=",$.sid(),"&resp_charset=UTF8&ef=js"].join("");
$.ajax({sUrl:f,vData:h,sType:j,oncomplete:function(k,l){
if(l==="success")
{
var n=$.evalVal(k.responseText);
d($.extend(n,e));
}
else{
var m={bErr:true};
d(m);
}
}});
},getCBInfo:function(d){
var e=[],f;
$.each(d,function(h,g){
f=[];
$.each(h.get("oTags")||[],function(k,j){
f.push(k.sId);
});
e.push({sFid:h.get("sFolderId"),sMid:h.get("sMailId"),bSys:h.get("bSys"),bUnr:h.get("nUnread")==1,bSubUnr:false,bStar:h.get("nStar"),bAddrvip:h.get("bAddrvip"),oSysTag:h.get("sFolderId")=="1"?h.get("oSysTag"):null,bTms:false,oTagIds:f,sSName:(h.get("oFrom")&&h.get("oFrom").sName)||"",sSEmail:(h.get("oFrom")&&h.get("oFrom").sAddr)||"",oTCont:document.createElement("div"),oStar:{}});
});
return {oWin:window,sFid:d[0].get("sFolderId"),bML:false,oMail:e};
},plusOne:function(d){
var d=d||0;
return parseInt(d)+1;
},getIconFromAddr:function(e){
var f=/@(\w+)\.\w+/gi.exec(e),d="";
if(f)
{
d=f[1];
if(d=="126")
{
d="netease_twosix";
}
else if(d=="163")
{
d="netease_sixthree";
}
}
return d;
},getFoldNameByFolderId:function(d){
var h=window.oModels["MetaData"],f=h.get("oFolders"),d=d||"1",g;
for(var j=0,e=f.length;j<e;j++)
{
g=f[j];
if(g.sId==d)
{
return g.sName;
}
}
},formatDate:function(e,d){
if(d==1)
{
return "<span class='txt_red'>\u5DF2\u88AB\u53D1\u9001\u8005\u5220\u9664</span>";
}
if(e==-1)
{
return "\u65E0\u9650\u671F";
}
else if(e<0)
{
return "<span class='txt_red'>\u5DF2\u8FC7\u671F</span>";
}
var g=60*60,f=24*g,h=Math.floor(e/f),j=Math.floor((e%f)/g);
if(h)
{
return [h<3?"<span class='txt_red'>":"",Math.max(h+1,0),"\u5929\u540E\u8FC7\u671F",h<3?"</span>":""].join("");
}
else{
if(j)
{
return ["<span class='txt_red'>",Math.max(j,0),"\u5C0F\u65F6\u540E\u8FC7\u671F","</span>"].join("");
}
else{
return ["<span class='txt_red'>",Math.max(Math.floor((e%f)/g*60),0),"\u5206\u949F\u540E\u8FC7\u671F","</span>"].join("");
}
}
},createForm:function(e,f){
var j=e.sFormId||$.unikey(),g=$.$("#"+j),h=[],d=$.TE(['<form method="$sMethod$" id="$sFormId$" name="$sFormId$" target="$sTarget$" action="$sAction$" enctype="multipart/form-data">','$@$for($oInputs$)$@$','<input name="$name$" type="hidden" value="$value$"/>','$@$endfor$@$','</form>']);
g.size()&&g.remove();
f=f||{};
f.sid=f.sid||$.sid();
$.each(f,function(l,k){
h.push({name:k,value:l});
});
e.oInputs=h;
$.$("body").insert(d.replace($.extend({sFormId:j,sTarget:"actionFrame",sMethod:"POST"},e)),"beforeEnd");
return $.$("#"+j);
},filterRepeatAddress:function(d){
var e={},f=[];
$.each(d,function(h,g){
if(!e[h.sAddr])
{
e[h.sAddr]=true;
f.push(h);
}
});
return f;
},receiveTimeFormat:function(d){
var g=(new Date()).getTime()/1000,e=31536000,k=QMWin.millTimeFormator(parseInt(d,10),g),f=k.indexOf("\u65E5");
if(getTop().getLocale()=="zh_CN")
{
if(f!=-1)
{
return k.substr(0,f+1);
}
else{
if(g-d>e)
{
k=k.split(" ")[0];
}
return k;
}
}
else{
var j=new Date(parseInt(d)*1000);
var h=new Date(+g*1000);
if(h.getFullYear()!=j.getFullYear())
{
return getTop().formatDayByLocale(j,"%YY%-%MM%-%DD%","%");
}
else{
return getTop().formatDayByLocale(j,"%MM%-%DD%","%");
}
}
}});
});
var c=$.lib("urm.utils");
})();
(function(){
var G=$.TE(['<textarea class="ur_lr_content" kd="ctrlEnter"></textarea>','<div class="ur_lr_operate">','<a class="btn_gray" ck="cancleSendMail">\u53D6\u6D88</a>','<a class="btn_blue" ck="sendMail">\u53D1\u9001</a>','<p>','<a title="\u65B0\u7A97\u53E3\u5199\u4FE1" class="uri_newwindow" ck="jumpNewWinReply" href="javascript:;"></a></p>','<div class="clr"></div>','</div>']),C=$.TE(['<div class="ur_l_reply" un="replyArea" style="display:none;" ck="stopPropagable">',G,'</div>']),D=$.TE(['$@$if($oToList$)$@$','\u53D1\u7ED9: ','$@$for($oToList$)$@$','$@$if($_idx_$>0&&$_idx_$<4)$@$, $@$endif$@$','$@$if($_idx_$<=4)$@$','$sName$','$@$endif$@$','$@$if( $_idx_$ == 5 )$@$','\u7B49','$@$endif$@$','$@$endfor$@$','$@$endif$@$']),E=$.TE(['<div class="ur_lr_operate">','<p><i class="icon_finish_m"></i>\u53D1\u9001\u6210\u529F</p>','<div class="clr"></div>','</div>']),q=$.TE(['<div class="ur_header attbg"><h1 class="ur_title">\u672A\u8BFB\u90AE\u4EF6</h1></div>','<div class="ur_loading_box"><span class="ico_loader"></span></div>']),h=$.TE(['<div class="clr"></div>']),e=$.TE(['<span class="tagbgSpan flagbg$sFlagBg$" tagid="$sId$">$sName$<a href="javascript:;" title="\u53D6\u6D88\u6B64\u6807\u7B7E" ck="removeTag" tagid="$sId$">&times;</a></span>']),H=$.TE(['$@$if($oInnerPicList.length$ > 0)$@$','<div class="ur_l_thumb">','<div class="img_inner" ck="previewPic">','<img src="$oInnerPicList.0.sUrl$" />','<span class="alpha_span"></span>','</div>','</div>','$@$endif$@$']),z=$.TE(['<ul class="ur_mailinfo">','<li>','$@$if($sType$!="group")$@$','<label class="ur_header_title">\u53D1\u4EF6\u4EBA\uFF1A</label>','<div class="ur_header_content">','<span>$oFrom.sName$</span>','<span class="gray">&lt;$oFrom.sAddr$&gt;</span>','</div>','$@$else$@$','<label class="ur_header_title">QQ\u7FA4\uFF1A</label>','<div class="ur_header_content">','<span>$oFrom.sName$</span>','</div>','$@$endif$@$','</li>','$@$if($sType$!="group")$@$','$@$if($oToList.length$>0)$@$','<li>','<label class="ur_header_title">\u6536\u4EF6\u4EBA\uFF1A</label>','<div class="ur_header_content ur_receiver">','$@$for($oToList$)$@$','<div class="left">','$sName$<span class="gray">&lt;$sAddr$&gt;</span>','$@$if($_parent_.oToList.length$ == 1)$@$','','$@$else$@$',';&nbsp;','$@$endif$@$','</div>','$@$endfor$@$','</div>','</li>','$@$endif$@$','$@$endif$@$','$@$if($oCcList.length$ > 0)$@$','<li>','<label class="ur_header_title">\u6284<span class="opa0">&mdash;</span>\u9001\uFF1A</label>','<div class="ur_header_content ur_receiver">','$@$for($oCcList$)$@$','<div class="left">','$@$eval Q.htmlEncode($sName$)$@$<span class="gray">&lt;$sAddr$&gt;</span>','$@$if($_parent_.oToList.length$ == 1)$@$','','$@$else$@$',';&nbsp;','$@$endif$@$','</div>','$@$endfor$@$','</div>','</li>','$@$endif$@$','<li>','<label class="ur_header_title">\u65F6<span class="opa0">&mdash;</span>\u95F4\uFF1A</label>','<div class="ur_header_content">','$sTime$','</div>','</li>','<li class="folder_detail">','<label class="ur_header_title">\u6587\u4EF6\u5939\uFF1A</label>','<span class="ur_header_content ur_l_from">$sFolderName$</span>','</li>','</ul>']),f=$.TE(['$@$for($_this_$)$@$',e,'$@$endfor$@$']),b=$.TE(['<li class="ur_l_attach_item" ck="$@$if($nExpireTime$>0||$nExpireTime$==-1)$@$previewAttachment$@$endif$@$" idx="$@$eval +$_idx_$ + ($_parent_.bigattachRank$ || 0) $@$" attid="$sAttId$" mailid="$_parent_.sMailId$">','<img class="left" src="$sIconUrl$">','$@$if($nExpireTime$>0||$nExpireTime$==-1)$@$','<a class="icon_ur uri_download" title="\u4E0B\u8F7D" href="$sDownloadUrl$" target="','$@$eval getTop().location.protocol.indexOf("https") > -1 ? "_blank" : "actionFrame"$@$','" ck="stopPropagable"></a>','$@$endif$@$','<div class="ur_lai_title bold">$@$html($sName$)$@$</div>','<div class="ur_lai_size graytext">($nSize$\uFF0C$@$eval _Utils.formatDate($nExpireTime$, $senderdelfile$)$@$)</div>','</li>']),d=$.TE(['<li class="ur_l_attach_item" ck="editOnlineDoc" onlineDocKey="$@$html($sFid$)$@$" mailid="$_parent_.sMailId$">','<img class="left" src="$sIconUrl$">','<a href="javascript:void(0);" class="icon_ur uri_download" title="\u5BFC\u51FA" ck="exportOnlineDoc" onlineDocKey="$@$html($sFid$)$@$" filename="$@$html($sName$)$@$"></a>','<div class="ur_lai_title bold">$@$html($sName$)$@$</div>','<div class="ur_lai_size graytext">($nSize$)</div>','</li>']),a=$.TE(['$@$if($oAttachs.length$ > 0 || $oBigAttachs.length$ > 0 || $oResumeWorks.length$ > 0 || $oOnlineAttachs.length$ > 0)$@$','<ul class="ur_l_attach att_num$@$eval ($oAttachs.length$ || 0) + ($oBigAttachs.length$ || 0) + ($oResumeWorks.length$ || 0) + ($oOnlineAttachs.length$ || 0) $@$">','$@$for($oAttachs$)$@$','<li class="ur_l_attach_item" ck="previewAttachment" idx="$_idx_$" attid="$sAttId$" mailid="$_parent_.sMailId$">','<div class="img_wrap">','<div class="img_inner">','<img src="$sIconUrl$">','<span class="alpha_span"></span>','</div>','</div>','<a class="icon_ur uri_download" title="\u4E0B\u8F7D" target="downFrame" href="$sDownloadUrl$" ck="stopPropagable"></a>','<div class="ur_lai_title bold">$sName$</div>','<div class="ur_lai_size graytext">($@$eval _Utils.formatSize($nSize$)$@$)</div>','<a ck="setAttachFlag" style="display:none" attid="$sAttId$">\u6536\u85CF</a>','</li>','$@$endfor$@$','$@$SetVar("bigattachRank", $oAttachs.length$ || 0)$@$','$@$for($oResumeWorks$)$@$',b,'$@$endfor$@$','$@$SetVar("bigattachRank", ($oAttachs.length$ || 0) + ($oResumeWorks.length$ || 0))$@$','$@$for($oBigAttachs$)$@$',b,'$@$endfor$@$','$@$for($oOnlineAttachs$)$@$',d,'$@$endfor$@$','<div class="clr"></div>','</ul>','$@$endif$@$']);
var m=$.TE(['<div class="att_bt">','<div class="ico_big" ck="previewAttachment" idx="$_idx_$" seq="$sSeq$" attid="$sAttId$">','<a><img src="$sIconUrl$"></a>','</div>','<div class="name_big">','<span>$sName$</span>','<span class="graytext">&nbsp;($@$eval _Utils.formatSize($nSize$)$@$<span id="span_attachIndex_$_parent_.sMailId$_$sComposePath$" style="display:none">, <span style="color: #C00;">\u9644\u4EF6\u5305\u542B\u75C5\u6BD2\uFF0C\u8BF7\u52FF\u4E0B\u8F7D\u6253\u5F00 <input type="button" class="qm_conversation_input_info" mor="showPoisonWaring" mot="hidePoisonWaring" style="cursor:pointer;vertical-align:-4px;"></span></span>)</span>','<div class="down_big">','<a href="javascript:;" ck="newTabPreviewAttach" idx="$_idx_$" previewType="1" seq="$sSeq$" selectfile="$sAttId$" attid="$sAttId$"','$@$if(getTop().gbSpreadPreview2OnlineDoc&&$nSize$<3145728)$@$','$@$if($sSuffix$=="xls"||$sSuffix$=="xlsx"||$sSuffix$=="doc"||$sSuffix$=="docx")$@$',' sParse2OnlineDocUrl="/cgi-bin/docedit_new?t=online_doc.html&action=attach2onlinedoc&fun=convert','$@$if($_root_.sType$=="group")$@$','&filetype=2&fileid=$sAttId$','&sendname=$_root_.oFrom.sName$&sendaddr=$_root_.oFrom.sAddr$&mailid=$_root_.sMailId$','$@$else$@$','&filetype=0&fileid=$_parent_.sMailId$','&sendname=$_parent_.oFrom.sName$&sendaddr=$_parent_.oFrom.sAddr$&mailid=$_parent_.sMailId$','$@$endif$@$','&filename=$sUrlEncodePath$','&sid=$@$eval getTop().getSid() $@$" down="$sDownloadUrl$" ','$@$endif$@$','$@$endif$@$','>\u9884\u89C8</a>&nbsp;&nbsp;&nbsp;','$@$if($nSize$<3145728&&$_root_.isOnlineDocOpen$=="1"&&!getTop().gbSpreadPreview2OnlineDoc)$@$','$@$if($sSuffix$=="xls"||$sSuffix$=="xlsx"||$sSuffix$=="doc"||$sSuffix$=="docx")$@$','<a title="\u9644\u4EF6\u8F6C\u5728\u7EBF\u6587\u6863\u7F16\u8F91" href="/cgi-bin/docedit_new?t=online_doc.html&action=attach2onlinedoc&fun=convert','$@$if($_root_.sType$=="group")$@$','&filetype=2&fileid=$sAttId$','$@$else$@$','&filetype=0&fileid=$_parent_.sMailId$','$@$endif$@$','&filename=$sUrlEncodePath$','&sid=$@$eval getTop().getSid() $@$&mailid=$_parent_.sMailId$">','\u5728\u7EBF\u7F16\u8F91</a>&nbsp;&nbsp;','$@$endif$@$','$@$endif$@$','<a href="$sDownloadUrl$" ck="stopPropagable" target="downFrame">\u4E0B\u8F7D</a>&nbsp;&nbsp;','<a ck="setAttachFlag" $@$if($nStar$==1)$@$style="display:none;"$@$endif$@$ attid="$sAttId$">','<span>\u6536\u85CF</span>','</a>','<span class="graytext" $@$if($nStar$!=1)$@$style="display:none"$@$endif$@$ un="attachstared" attid="$sAttId$">','<span>\u5DF2\u6536\u85CF,&nbsp;</span><a href="javascript:;" onclick="getTop().jumpToAttachFlag(\'$_parent_.sMailId$\',\'$sUrlEncodePath$\')">\u67E5\u770B</a>','</span>','&nbsp;&nbsp;&nbsp;<a attid="$sAttId$" size="$nSize$" ck="netDiskUpload" class="netdisk_hide">','<span >\u8F6C\u5B58</span>','<span class="bind_down_icon"></span>','</a>','</div>','</div>','</div>']);
var n=$.TE(['<div class="att_bt">','<div class="ico_big" ck="previewAttachment" idx="$@$eval +$_idx_$ + ($_parent_.bigattachRank$ || 0) $@$" seq="$sSeq$" attid="$sAttId$">','<a title="" href="javascript:void(0);" ><img src="$sIconUrl$"></a>','</div>','<div class="name_big">','<a class="a_name" href="','$@$if($nExpireTime$<0&&$nExpireTime$!=-1)$@$','javascript:void(0);','$@$else$@$','$sDownloadUrl$','$@$endif$@$','" target="$@$eval getTop().location.protocol.indexOf("https") > -1 ? "_blank" : "actionFrame"$@$">','<span>$@$eval Q.htmlEncode($sName$)$@$</span></a>','<span class="graytext">&nbsp;($nSize$,&nbsp;$@$eval _Utils.formatDate($nExpireTime$, $senderdelfile$)$@$)</span>','$@$if($nExpireTime$>0 || $nExpireTime$==-1)$@$','<div class="down_big">','<a href="javascript:;" ck="newTabPreviewAttach" idx="$@$eval +$_idx_$ + ($_parent_.bigattachRank$ || 0) $@$" previewType="1" seq="$sSeq$" selectfile="$sFid$" attid="$sAttId$"','$@$if(getTop().gbSpreadPreview2OnlineDoc&&Math.abs($nByteSize$)<3145728)$@$','$@$if($sSuffix$=="xls"||$sSuffix$=="xlsx"||$sSuffix$=="doc"||$sSuffix$=="docx")$@$',' sParse2OnlineDocUrl="/cgi-bin/docedit_new?t=online_doc.html&action=attach2onlinedoc&fun=convert&filetype=1&','fileid=$sFid$&filename=$sUrlEncodePath$','$@$if($_root_.sType$=="group")$@$','&sendname=$_root_.oFrom.sName$&sendaddr=$_root_.oFrom.sAddr$&mailid=$_root_.sMailId$','$@$else$@$','&sendname=$_parent_.oFrom.sName$&sendaddr=$_parent_.oFrom.sAddr$&mailid=$_parent_.sMailId$','$@$endif$@$','&k=$sKey$&code=$sCode$&sid=$@$eval getTop().getSid() $@$" down="$sDownloadUrl$" ','$@$endif$@$','$@$endif$@$','>\u9884\u89C8</a>&nbsp;&nbsp;&nbsp;','$@$if(Math.abs($nByteSize$)<3145728&&$_root_.isOnlineDocOpen$=="1"&&!getTop().gbSpreadPreview2OnlineDoc)$@$','$@$if($sSuffix$=="xls"||$sSuffix$=="xlsx"||$sSuffix$=="doc"||$sSuffix$=="docx")$@$','<a title="\u9644\u4EF6\u8F6C\u5728\u7EBF\u6587\u6863\u7F16\u8F91" href="/cgi-bin/docedit_new?t=online_doc.html&action=attach2onlinedoc&fun=convert&filetype=1&','fileid=$sFid$&filename=$sUrlEncodePath$','&k=$sKey$&code=$sCode$&sid=$@$eval getTop().getSid() $@$&mailid=$_parent_.sMailId$">','\u5728\u7EBF\u7F16\u8F91</a>&nbsp;&nbsp;','$@$endif$@$','$@$endif$@$','<a title="" href="$sDownloadUrl$" target="','$@$eval getTop().location.protocol.indexOf("https") > -1 ? "_blank" : "actionFrame"$@$','" ck="stopPropagable">\u4E0B\u8F7D</a>&nbsp;&nbsp;&nbsp;','<a href="javascript:;" oXfLinkArray="/cgi-bin/ftnExs_download?k=$sKey$&t=exs_ftn_download&code=$sCode$" ck="xfDl" style="display:none; margin-right:12px;">\u65CB\u98CE\u4E0B\u8F7D</a>','&nbsp;&nbsp;&nbsp;<a attid="$sAttId$" size="$nSize$" ck="netDiskUpload" class="netdisk_hide" bigattch="true" $@$if($sSaveUrl$)$@$ k="$sAttId$" ftnsaveurl="$sSaveUrl$" $@$endif$@$ fid="$sFid$">','<span >\u8F6C\u5B58</span>','<span class="bind_down_icon"></span>','</a>','</div>','$@$endif$@$','</div>','</div>']);
var o=$.TE(['<div class="att_bt">','<div class="ico_big" ck="editOnlineDoc" onlineDocKey="$@$html($sFid$)$@$">','<a title="" href="javascript:void(0);" ><img src="$sIconUrl$"></a>','</div>','<div class="name_big">','<a class="a_name" href="javascript:void(0);" ck="exportOnlineDoc" onlineDocKey="$@$html($sFid$)$@$" filename="$@$html($sName$)$@$">','<span>$@$eval Q.htmlEncode($sName$) $@$</span></a>','<span class="graytext">&nbsp;($nSize$)</span>','<div class="down_big">','<a href="javascript:;" ck="editOnlineDoc" onlineDocKey="$@$html($sFid$)$@$">\u7F16\u8F91</a>&nbsp;&nbsp;&nbsp;','<a href="javascript:void(0);" ck="exportOnlineDoc" onlineDocKey="$@$html($sFid$)$@$" filename="$@$html($sName$)$@$">\u5BFC\u51FA</a>&nbsp;&nbsp;&nbsp;','<a href="javascript:;" ck="starOnlineDoc" onlineDocKey="$@$html($sFid$)$@$">','<span>\u6536\u85CF</span>','</a>','<span id="span_stared_$@$html($sFid$)$@$" style="display:none;" class="graytext">','<span>\u5DF2\u6536\u85CF,&nbsp;</span><a href="javascript:;" ck="viewOnlineDoc" onlineDocKey="$@$html($sFid$)$@$">\u67E5\u770B</a>','</span>','</div>','</div>','</div>']);
var l=$.TE(['$@$if($oAttachs.length$ > 0 || $oResumeWorks.length$ > 0 || $oBigAttachs.length$ > 0 || $oOnlineAttachs.length$ > 0)$@$','<div class="qqmail_attachment_listmargin att_wrapper">','<div class="attbg att_in" id="netdisk_readmail_tips_$@$eval getTop().unikey()$@$">','<div class="att_inner">','<b class="att_size">','<img border="0" align="absmiddle" class="showattch" src="/zh_CN/htmledition/images/icon_att.gif"> \u9644\u4EF6','</b>','(<span>$@$eval +($oAttachs.length$ || 0) + ($oResumeWorks.length$ || 0) + ($oOnlineAttachs.length$ || 0) + ($oBigAttachs.length$ || 0) $@$</span>\u4E2A)','$@$if($oAttachs.length$ > 0 || $oBigAttachs.length$ > 0 || $oResumeWorks.length$ > 0 || $oOnlineAttachs.length$ > 0)$@$','&nbsp;&nbsp;','$@$endif$@$','</div>','<div class="att_cont">','$@$if($bHasResumeAttach$)$@$','<div class="qm_conversation_backwhite f_size att_cont_inner">','<div class="graytext clear att_cont_tit">','<b class="black bold f_size">\u7B80\u5386</b>','</div>','$@$for($oAttachs$)$@$','$@$if($bResumeAttach$)$@$',m,'$@$endif$@$','$@$endfor$@$','</div>','$@$endif$@$','$@$if($oResumeWorks.length$ > 0)$@$','<div class="qm_conversation_backwhite f_size att_cont_inner">','<div class="graytext clear att_cont_tit">','<b class="black bold f_size">\u4F5C\u54C1</b>','</div>','$@$SetVar("bigattachRank", $oAttachs.length$ || 0)$@$','$@$for($oResumeWorks$)$@$',n,'$@$endfor$@$','</div>','$@$endif$@$','$@$if($oAttachs.length$ > $resumeAttachCount$)$@$','<div class="qm_conversation_backwhite f_size att_cont_inner">','<div class="graytext clear att_cont_tit">','<b class="black bold f_size">\u666E\u901A\u9644\u4EF6</b> (<span class="ico_Avira"></span>\u5DF2\u901A\u8FC7\u5C0F\u7EA2\u4F1E\u6740\u6BD2\u5F15\u64CE\u626B\u63CF)&nbsp;','<a title="\u5168\u90E8\u4E0B\u8F7D" class="down_all" target="downFrame"  href="/cgi-bin/download?mailid=$sMailId$&sid=$@$eval QMWin.sid()$@$" ck="stopPropagable">','<img class="ico_down" src="/zh_CN/htmledition/images/spacer.gif">','\u5168\u90E8\u4E0B\u8F7D','</a>','</div>','$@$for($oAttachs$)$@$','$@$if(!$bResumeAttach$)$@$',m,'$@$endif$@$','$@$endfor$@$','</div>','$@$endif$@$','$@$if($oBigAttachs.length$ > 0)$@$','<div class="qm_conversation_backwhite f_size att_cont_inner">','<div class="graytext clear att_cont_tit">','<b class="black bold f_size">\u8D85\u5927\u9644\u4EF6</b>','</div>','$@$SetVar("bigattachRank", ($oAttachs.length$ || 0) + ($oResumeWorks.length$ || 0))$@$','$@$for($oBigAttachs$)$@$',n,'$@$endfor$@$','</div>','$@$endif$@$','$@$if($oOnlineAttachs.length$ > 0)$@$','<div class="qm_conversation_backwhite f_size att_cont_inner">','<div class="graytext clear att_cont_tit">','<b class="black bold f_size">\u7F16\u8F91\u6587\u6863</b>','</div>','$@$for($oOnlineAttachs$)$@$',o,'$@$endfor$@$','</div>','$@$endif$@$','</div>','</div>','</div>','$@$endif$@$']);
var p=$.TE(['$@$if($bGroupOff$)$@$','<span>\u8BE5\u90AE\u4EF6\u56E0\u7591\u4F3C\u5783\u573E\u90AE\u4EF6\u5DF2\u88AB\u7FA4\u4E3B\u6216\u7CFB\u7EDF\u5C4F\u853D\uFF0C\u82E5\u8981\u67E5\u770B\uFF0C\u8BF7\u8054\u7CFB\u7FA4\u4E3B\u53D6\u6D88\u5C4F\u853D\u3002</span>','$@$else$@$','$@$for($oMembers$)$@$','<div class="ur_group_content" un="groupfloor" floor="$@$eval +$_parent_.oMembers.length$ - $_idx_$ $@$">','<div class="qm_converstaion_bd">','<div class="zh_cf qm_ur_info">','<a href="javascript:;" class="img_out">','<img src="/cgi-bin/getqqicon?uin=$nUin$" class="pointer">','</a>','<div class="graytex">','<span class="qm_right_text">$@$eval +$_parent_.oMembers.length$ - $_idx_$ $@$ \u697C</span>','<a href="javascript:;" class="green b_size bold qm_ur_name">$@$eval Q.htmlEncode($sName$)$@$</a>','<span class="f_size normal qm_ur_time">$sTime$</span>','</div>','</div>','<div class="qm_ur_cnt">$sContent$</div>',l,'</div>','</div>','$@$endfor$@$','$@$endif$@$']);
var y=$.TE(['<div class="ur_l_right graytext f_size normal">','<span class="ur_l_time">$@$eval _Utils.receiveTimeFormat($nTime$)$@$</span>','$@$if($sFolderType$ == "pop")$@$','<span class="ur_l_from"><span class="mailboxlist $@$eval _Utils.getIconFromAddr($sFolderName$)$@$" title="$sFolderName$"></span></span>','$@$else$@$','<span class="ur_l_from">$sFolderName$</span>','$@$endif$@$','</div>','<div class="ur_l_mailhead " >','<span class="ur_l_sender grn b_size bold">','$@$if($sType$=="conv")$@$','$@$for($oFroms$)$@$','$@$if($_idx_$ != 0)$@$',', ','$@$endif$@$','$sName$','$@$endfor$@$','$@$else$@$','$oFrom.sName$','$@$endif$@$','</span>','<span class="graytext f_size">\u300B</span>','<span class="ur_l_subject b_size bold" ck="expandOrFold" un="subject">','$@$if($sSubject$)$@$','$sSubject$','$@$else$@$','(\u65E0\u4E3B\u9898)','$@$endif$@$','$@$if($nTotalSubMails$)$@$','($nTotalSubMails$)','$@$endif$@$','</span>','<span class="ur_l_star" title="\u661F\u6807\u90AE\u4EF6"></span>','<span ui-type="tags">','$@$for($oTags$)$@$',e,'$@$endfor$@$','</span>','</div>']),x=$.TE(['<div class="ur_l_fold">',H,'<p class="ur_l_abstract">','$@$if($sAbstract$)$@$','$sAbstract$','&nbsp;...&nbsp;<a class="action_readall" ck="expandOrFold">\u5168\u6587&darr;</a>','$@$else if($oMembers$)$@$','$@$for($oMembers$)$@$','$sName$:&nbsp;$sAbstract$','$@$endfor$@$','&nbsp;...&nbsp;<a class="action_readall" ck="expandOrFold">\u5168\u6587&darr;</a>','$@$else$@$','(\u65E0\u6458\u8981)\uFF0C<a class="action_readall" ck="expandOrFold">\u5168\u6587&darr;</a>','$@$endif$@$','</p>','<div class="clr"></div>',a,'<i class="icon_uri_stared" title="\u661F\u6807\u90AE\u4EF6"></i>','</div>']),w=$.TE(['<div class="ur_l_expand">',z,'<div class="contentDiv qqmail_webmail_only" ck="viewFullPage">','<div ui-type="content" class="qmbox"></div>','<div class="ur_l_loading" style="display:none">','<span class="ico_loader"></span>','</div>','</div>','$@$if($sType$ == "normal")$@$',l,'$@$endif$@$','</div>']),u=$.TE(['<div class="ur_l_content">','<div class="ur_l_mailhead ">','<span class="ur_l_sender grn b_size bold">$oFrom.sName$<span class="gray normal">&lt;$oFrom.sAddr$&gt;</span></span>','<span class="ur_l_time graytext f_size normal">$sTime$</span>','</div>','<ul class="ur_mailinfo">','$@$if($oToList.length$ > 0)$@$','<li>','<label class="ur_header_title">\u6536\u4EF6\u4EBA\uFF1A</label>','<div class="ur_header_content ur_receiver">','$@$for($oToList$)$@$','<div class="left">','$sName$<span class="gray">&lt;$sAddr$&gt;</span>','$@$if($_parent_.oToList.length$ == 1)$@$','','$@$else$@$',';&nbsp;','$@$endif$@$','</div>','$@$endfor$@$','</div>','</li>','$@$endif$@$','$@$if($oCcList.length$ > 0)$@$','<li>','<label class="ur_header_title">\u6284<span class="opa0">&mdash;</span>\u9001\uFF1A</label>','<div class="ur_header_content ur_receiver">','$@$for($oCcList$)$@$','<div class="left">','$@$eval Q.htmlEncode($sName$)$@$<span class="gray">&lt;$sAddr$&gt;</span>','$@$if($_parent_.oCcList.length$ == 1)$@$','','$@$else$@$',';&nbsp;','$@$endif$@$','</div>','$@$endfor$@$','</div>','</li>','$@$endif$@$','<li>','<label class="ur_header_title">\u65F6<span class="opa0">&mdash;</span>\u95F4\uFF1A</label>','<div class="ur_header_content">','$sTime$','</div>','</li>','<li class="folder_detail">','<label class="ur_header_title">\u6587\u4EF6\u5939\uFF1A</label>','<div class="ur_header_content">','<span class="ur_l_from">$sFolderName$</span>','</div>','</li>','</ul>','<div class="contentDiv">','<div ui-type="content"></div>','<a ck="dispRef" class="foldBtn" style="display:none">----------\u663E\u793A\u5F15\u7528\u7684\u5185\u5BB9----------</a>','<div ui-type="fold"></div>','<div class="ur_l_loading" style="display:none"><span class="ico_loader"></span></div>','</div>',l,'</div>','<div class="ur_l_conv_read_all">','<a href="javascript:;" ck="newwinReadConv">\u67E5\u770B\u4F1A\u8BDD\u4E2D\u5176\u4ED6$_parent_.nTotalSubMails$\u5C01\u90AE\u4EF6...</a>','</div>']),v=$.TE(['<div class="ur_l_expand">',u,'</div>']),s=$.TE(['<div class="ur_l_action" unselectable="on" onselectstart="return false;">','$@$if($nXqqStyle$>=1&&$nXqqStyle$<=9&&$nXqqStyle$!=3)$@$','$@$else$@$','<a class="icon_ur uri_reply" ck="replyMailPopUp" closed="1">\u56DE\u590D</a>','$@$endif$@$','<a class="icon_ur uri_star" ck="markUnread">\u6807\u4E3A\u672A\u8BFB</a>','<a class="icon_ur uri_del" ck="removeMail">\u5220\u9664</a>','<a class="icon_ur uri_more" ck="moreOptions">\u66F4\u591A\u64CD\u4F5C</a>',C,'</div>','<a class="icon_ur uri_packup" title="\u6536\u8D77" ck="expandOrFold"></a>']),t=$.TE(['$@$if($nUnread$ > 0)$@$','<span class="ur_symbol" title="\u672A\u8BFB"></span>','$@$else$@$','<span class="ur_symbol symbol_readed" title="\u6807\u4E3A\u672A\u8BFB" ck="markUnread"></span>','$@$endif$@$']);
var j=$.TE(['<div class="error_loading">\u62C9\u53D6\u5931\u8D25\uFF0C<a href="javascript:;" class="qm_underline pointer" ck="refetchData" hidefocus>\u91CD\u8BD5</a></div>']),B=$.TE(['<li ui-type="nomails" class="ur_l_item last_item">\u6682\u65E0\u672A\u8BFB\u90AE\u4EF6</li>']),A=$.TE(['<div class="graytip new_mail_tip" style="display:none">\u4F60\u6709$nNewMailCount$\u5C01\u65B0\u90AE\u4EF6\u4E86\uFF0C<a href="javascript:;" ck="showNewMail">\u70B9\u51FB\u67E5\u770B</a></div>']),c=$.TE(['<li class="ur_l_item type_$sType$ $@$if($nStar$==1)$@$li_mail_stared$@$endif$@$ $sFolderType$" ',' dbl="expandOrFold" ',' mailid=$sMailId$ mor="mor" mot="mot" ur_action="can_expand" mailtype="$sType$" un="mail" folder="$@$eval $sFolderType$ || $sFolderId$$@$">','<div class="ur_l_item_inner" >','$@$if($sType$ == "normal")$@$',y,x,w,s,t,'$@$endif$@$','$@$if($sType$ == "conv")$@$','<div class="conv_wrap">',y,'$@$for($oSubMails$)$@$','$@$if($_idx_$ == 0)$@$','<div mailid="$sMailId$" un="mail">',x,v,'</div>','$@$endif$@$','$@$endfor$@$','</div>',s,t,'$@$endif$@$','$@$if($sType$ == "group")$@$',y,x,w,s,t,'$@$endif$@$','</div>','</li>']),r=$.TE(['$@$for($oMails$)$@$','$@$if($sType$!="submail")$@$',c,'$@$endif$@$','$@$endfor$@$']);
var g=$.TE(['<div class="ur_header attbg">','<ul class="ur_top_change right">','<li class="left change_new cur">','<a href="#" class="btn_gray change_btn" title="\u6458\u8981\u6A21\u5F0F"><span class="icon_new"></span></a>','</li>','<li class="left change_old" nType="1" ck="changeVersion">','<a href="#" class="btn_gray change_btn" title="\u5217\u8868\u6A21\u5F0F"><span class="icon_old"></span></a>','</li>','</ul>','<a class="btn_gray right" href="javascript:;" ck="markAllAsRead">\u5168\u90E8\u6807\u4E3A\u5DF2\u8BFB</a>','<h1 class="ur_title">\u672A\u8BFB\u90AE\u4EF6<span></span></h1>','</div>','<div class="ur_container">','<div class="graytip lock_folder" style="display:none">\u201C\u6587\u4EF6\u5939\u533A\u57DF\u201D\u5904\u4E8E\u52A0\u9501\u72B6\u6001\uFF0C\u4F60\u53EF\u4EE5<a href="javascript:;" ck="unlockFolder">\u89E3\u9501</a>\u540E\u67E5\u770B\u5176\u90AE\u4EF6</div>','<div class="graytip new_mail_tip" style="display:none">\u4F60\u6709#nNewMailCount#\u5C01\u65B0\u90AE\u4EF6\u4E86\uFF0C<a href="javascript:;" ck="showNewMail">\u70B9\u51FB\u67E5\u770B</a></div>','<ul class="ur_list">','<li class="loading_more loading_all"><span class="ico_loader"></span></li>','<li class="item_end"><div class="item_end_line"><span class="item_end_dot">&#183;</span></div></li>','</ul>','</div>']);
var F=$.TE(['<span><span class="icon_ur uri_stared">\u5DF2\u6807\u8BB0\uFF0C</span><a ck="markAsRead" class="nostar">\u53D6\u6D88</a></span>']);
var k=$.TE(['<li class="ur_folder_title" >','<a href="javascript:;" folder="$@$eval $sFolderType$ || $sFolderId$$@$" class="folder_title cur_default" hidefocus><span class="ico_class_folder"></span><label><b>$sFolderName$</b></label></a>','</li>']);
$.createLib("urm.view",{bStatic:true},function(){
var I={"foldersep":function(){
return k;
},"container":function(){
return g;
},"mails":function(){
return r;
},"readconvmail":function(){
return _CONV_MAILS_TMPLS;
},"readgroupmail":function(){
return p;
},"replyMailPopUp":function(){
return C;
},"replySuc":function(){
return E;
},"tag":function(){
return e;
},"tagCopy":function(){
return f;
},"loading":function(){
return q;
},"replyAddress":function(){
return D;
},"errorloading":function(){
return j;
},"nomails":function(){
return B;
},"textarea":function(){
return G;
},"newmailtip":function(){
return A;
},"setread":function(){
return F;
}};
return ({get:function(K,J){
return I[K]().replace(J||{});
}});
});
})();
(function(){
var a=$.lib("urm.utils");
$.createLib("urm.libevent",{bStatic:true},function(){
return ({rule:function(){
return ({click:{dispRef:{bPropagable:false,sContext:"mail"},newwinReadConv:{bPropagable:false,sContext:"mail"},moreOptions:{bPropagable:false,sContext:"mail"},downLoadAttach:{bPropagable:false},xfDl:{bPropagable:false},markAsRead:{bPropagable:false,sContext:"mail"},markAllAsRead:{},markStar:{bPropagable:false,sContext:"mail"},markUnread:{bPropagable:false,sContext:"mail"},removeMail:{bPropagable:false,sContext:"mail"},replyMailPopUp:{bPropagable:false,sContext:"mail"},sendMail:{bPropagable:false,sContext:"mail"},cancleSendMail:{bPropagable:false},addNewMail:{},updateSpecifyMail:{},previewPic:{bPropagable:false,sContext:"mail"},previewAttachment:{bPropagable:false,sContext:"mail"},editOnlineDoc:{bPropagable:false,sContext:"mail"},exportOnlineDoc:{bPropagable:false,sContext:"mail"},viewOnlineDoc:{bPropagable:false,sContext:"mail"},starOnlineDoc:{bPropagable:false,sContext:"mail"},showScanImg:{bPropagable:false,sContext:"mail"},newTabPreviewAttach:{bPropagable:false,sContext:"mail"},stopPropagable:{bPropagable:false},netDiskUpload:{bPropagable:false,sContext:"mail"},setAttachFlag:{bPropagable:false,sContext:"mail"},jumpNewWinReply:{bPropagable:false},removeTag:{bPropagable:false},unlockFolder:{bPropagable:false},changeVersion:{bPropagable:false}},mouseover:{mor:{bPropagable:false}},mouseout:{mot:{bPropagable:false}},keydown:{ctrlEnter:{bPropagable:false}}});
},events:function(){
return ({dispRef:function(c,d,b){
var l=this,g=$.$(b),f=g.find("div.contentDiv"),k=f.find("div.ur_l_loading"),j=f.find("div[ui-type='fold']"),h=f.find("a.foldBtn"),m=l.getModel("URMData");
function n()
{
var o=h.html();
if(/\u663E\u793A/.test(o))
{
h.html(o.replace("\u663E\u793A","\u9690\u85CF"));
}
else{
h.html(o.replace("\u9690\u85CF","\u663E\u793A"));
}
}
if(h.html().indexOf("\u663E\u793A")!=-1)
{
if(!j.html())
{
var e=f.height();
k.show();
f.slideDown({oStyle:{height:[e,f.height()].join(",")}});
m.fetchContent($.$(b).attr("mailid"),{sAttr:"sFoldContent",onsuccess:function(o){
e=f.height();
j.html(o.sFoldContent);
k.hide();
f.slideDown({oStyle:{height:[e,f.height()].join(",")}});
}});
}
else{
e=f.height();
j.show();
f.slideDown({oStyle:{height:[e,f.height()].join(",")}});
}
n();
}
else{
var e=f.height();
k.hide();
j.hide();
f.slideDown({oStyle:{height:[e,f.height()].join(",")}});
n();
}
},unlockFolder:function(b,c){
var d=this;
window.location.href=$.T("/cgi-bin/readtemplate?sid=$sid$&t=checkpwd&delegate_url=$url$").replace({sid:$.sid(),url:encodeURIComponent(window.location.href)});
$.preventDefault(b);
},changeVersion:function(b,c){
var e=this,f=$.$(c),d=1,g=$.now();
e.sChangeVersionTimeStr=g;
getTop().showProcess(1,true,"\u5207\u6362\u4E2D...",null,false);
a.xhrSend("/cgi-bin/setting4",{sMethod:"POST",sTimeStr:g,sData:"Fun=submit&t=unreadmail.json&subt=changeversion&openunread="+f.attr("nType")},function(h){
if(h&&h.errcode)
{
getTop().showError("\u5207\u6362\u5931\u8D25");
}
else{
if(h.sTimeStr&&h.sTimeStr===e.sChangeVersionTimeStr&&f.attr("nType")==="1")
{
getTop().showProcess(0);
f.parent("ul").find("li.cur").rmClass("cur");
f.addClass("cur");
getTop().goUrlMainFrm("/cgi-bin/mail_list?page=0&flag=new&s=unread&sFrom=today_main&sid="+$.sid()+"&loc=readtemplate,unreadmail,,118&"+e.getFoldersQueryString()+"&tagid="+(e.oLocParams.tagid||"")+(e.oLocParams.folderid==8?"&t=mail_list_group":""));
}
}
});
},jumpNewWinReply:function(b,c){
var e=this,f=e.dom$().$(c),d=f.parents("li[mailid]"),g=d.attr("mailid");
e.jumpNewWin(g,{sContent:d.find("textarea").attr("value"),sMailType:d.attr("mailtype"),onsuccess:function(){
}});
e.setMailRead([g],{onsuccess:function(){
e.setReadDom(d,false);
}});
},ctrlEnter:function(b,c){
if(b.ctrlKey&&b.keyCode==13)
{
var e=$.$(c),d=e.parent("div").find("a[ck='sendMail']");
d.fireEvent("click");
}
},mor:function(b,c){
$.isBrowser("ie6")&&$.$(c).addClass("li_hover");
},mot:function(b,c){
$.isBrowser("ie6")&&$.$(c).rmClass("li_hover");
},stopPropagable:function(b,c){
},downLoadAttach:function(b,c){
window.open(c.getAttribute("url"),"_blank");
},xfDl:function(b,c){
var f=getTop(),g=f.attr(c,"oXfLinkArray"),d=function(j,h){
switch(j)
{case "check":
f.showProcess(1,true,"\u6B63\u5728\u68C0\u6D4B\u65CB\u98CE...");
break;
case "get_url":
f.showProcess(1,true,"\u6B63\u5728\u83B7\u53D6\u4E0B\u8F7D\u94FE\u63A5...");
break;
case "load_err":
f.showProcess(0);
showError("\u65CB\u98CE\u52A0\u8F7D\u5931\u8D25,\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01");
break;
case "geturl_err":
f.showProcess(0);
showError(h+"\u4E2A\u6587\u4EF6\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
break;
case "check_err":
f.showProcess(0);
if(confirm("\u60A8\u8FD8\u6CA1\u5B89\u88C5QQ\u65CB\u98CE\uFF0C\u73B0\u5728\u53BB\u4E0B\u8F7D\u5B89\u88C5\u4E48\uFF1F\u5B89\u88C5\u5B8C\u540E\u8BF7\u5237\u65B0\u672C\u9875\u9762\u3002"))
{
window.open("http://xf.qq.com/xf2/index.html");
}
break;
}
};
var e=new (f.clsXfBatchDownload)([g],d);
},showScanImg:function(c,d,b){
var g=this,f=$.$(b),h=f.attr("mailid"),e=g.getModel("URMData").getAttachment(h,$.$(d).attr("attid"));
getTop().showTwoDCodeImgMenu(window,d,e.sName,e.sDownloadUrl);
},newTabPreviewAttach:function(c,d,b){
var j=this,k=$.$(d),l=getTop(),h=$.$(b),o=k.attr("previewType"),m=h.attr("mailid"),n=h.attr("mailtype"),g=j.getModel("URMData").getAttachment(m,k.attr("attid"));
function e(p)
{
var q=getTop();
var s=q.attr(p,"sParse2OnlineDocUrl");
if(s&&!q.gbIsIE)
{
var r=q.attr(p,"down");
return [s,"&preview=1","&downloadurl=",encodeURIComponent(r)].join("");
}
else{
return;
}
}
function f()
{
var p=e(d);
if(p)
{
l.open(p,"_blank");
return;
}
j.newTabPreviewAttach(m,{sSelect:k.attr("idx"),sSelectFile:k.attr("selectfile"),sSeq:k.attr("seq")||""});
}
if(l.attr(d,"ispoison")=="1")
{
j.confirmOpen({msg:"\u9644\u4EF6\u53EF\u80FD\u5305\u542B\u75C5\u6BD2\u6216\u6B3A\u8BC8\u4FE1\u606F\uFF0C\u8BF7\u52FF\u9884\u89C8\u3002",btnTxt:"\u7EE7\u7EED\u9884\u89C8",kvKey:"preview"},function(){
f();
});
return;
}
else{
f();
}
},netDiskUpload:function(c,d,b){
var f=this,g=f.dom$().$(d),e=$.$(b),h=g.attr("attid");
f.netDiskUpload(d,e.attr("mailid"),h);
},setAttachFlag:function(c,d,b){
var f=this,g=f.dom$().$(d),h=g.attr("attid"),e=$.$(b);
f.setAttachFlag(e.attr("mailid"),{bStar:true,sAttId:h,onsuccess:function(){
g.hide();
e.find("[un='attachstared']").each(function(k,j){
if(k.getAttribute("attid")===h)
{
$.$(k).show();
return true;
}
});
}});
},markAsRead:function(c,d,b){
var f=this,g=f.dom$().$(d),e=f.$.$(b),h=e.attr("mailid");
f.setMailRead([h],{onsuccess:function(){
f.setReadDom(e,false);
}});
},removeTag:function(b,c){
var d=this,e=d.$.$(c);
d.cancelTag(e.parents("li[mailid]").attr("mailid"),{sTagId:e.attr("tagid"),onsuccess:function(){
e.parents("span.tagbgSpan").remove();
}});
},markAllAsRead:function(b,c){
var e=this,d=e.dom$();
e.setAllMailRead({onsuccess:function(){
getTop().showInfo("\u8BBE\u7F6E\u5DF2\u8BFB\u6210\u529F");
d.find("span.ur_symbol").addClass("symbol_readed");
},onerror:function(){
getTop().showError("\u8BBE\u7F6E\u5DF2\u8BFB\u5931\u8D25");
}});
},markUnread:function(c,d,b){
var h=this,f=h.dom$(),e=f.$(b),j=f.$(d),g=j.parents("li[mailid]"),k=e.attr("mailid");
if(j.hasClass("uri_star"))
{
h.setMailRead([k],{bFlag:true,onsuccess:function(){
h.setReadDom(g,true);
}});
}
},markStar:function(c,d,b){
var j=this,g=j.dom$(),f=g.$(b),k=j.dom$().$(d),h=k.parents("li[mailid]"),l=f.attr("mailid"),e=!k.hasClass("uri_stared");
j.star(l,{bStar:e,onsuccess:function(){
if(e)
{
k.addClass("uri_stared").rmClass("uri_star").html("\u53D6\u6D88\u661F\u6807");
f.attr("mailtype")&&f.addClass("li_mail_stared");
}
else{
k.addClass("uri_star").rmClass("uri_stared").html("\u6DFB\u52A0\u661F\u6807");
f.attr("mailtype")&&f.rmClass("li_mail_stared");
}
}});
},removeMail:function(c,d,b){
var g=this,f=g.dom$(),e=$.$(b);
g.del(e.attr("mailid"),{bCompleteDel:false,onsuccess:function(){
e.fadeOut(function(){
var j=f.$(this),h=j.attr("folder");
j.remove();
g.firstLastItemClass();
var k=f.find("li[folder='"+h+"']");
if(k.size()==0)
{
f.find("a[folder='"+h+"']").parents("li.ur_folder_title").remove();
}
if(f.find("li[un='mail']").size()===0&&f.find("li.loading_more").css("display")==="none")
{
f.find("ul.ur_list").insert(g.getView("nomails",{}),"afterBegin");
f.find("div.ur_container").addClass("ur_empty");
f.find("[ck='markAllAsRead']").hide();
}
});
}});
},replyMailPopUp:function(c,d,b){
var n=this,o=n.$.$(d),j=n.$.$(b),k=$.$(d).parents("li[mailid]"),m=j.find("[un='replyArea']"),p=j.attr("mailid"),q=k.attr("mailtype"),e=q==="conv"&&j.attr("mailtype")?true:false,g=false,f=false,m,h=function(r){
var s,t;
switch(q)
{case "group":
s=[r["oFrom"]];
break;
case "conv":
s=r.oReplyTo.concat(r.oReplyCc||[]);
break;
case "normal":
s=r["oReplyTo"].concat(r["oReplyCc"]||[]);
break;
}s=a.filterRepeatAddress(s);
j.find("[ck='jumpNewWinReply']").insert(n.getView("replyAddress",{oToList:s}),"beforeBegin");
m.attr("nReady",1);
};
if(o.attr("closed")==0)
{
m.slideUp({vDuration:"fast",oncomplete:function(){
m.hide();
}});
o.attr("closed","1").addClass("uri_reply").rmClass("uri_replying");
}
else{
o.attr("closed","0").addClass("uri_replying").rmClass("uri_reply");
g=m.attr("nReady")==1;
if(!m.find("textarea").size())
{
m.html(n.getView("textarea",{r:Math.random()}));
}
m.slideDown({vDuration:"fast",oncomplete:function(){
m.show();
setTimeout(function(){
var s=m.find("textarea").data(0);
try{
s.focus();
}
catch(r)
{
}
});
}});
if(!g)
{
var l={"conv":"fetchConv","normal":"fetchContent","group":"fetchGroup"};
if(q==="conv")
{
n.getModel("URMData")[l[q]](k.attr("mailid"),{onsuccess:function(r){
n.getModel("URMData").fetchContent(r.oSubMails[0].sMailId,{sAttr:"oReplyTo",onsuccess:function(s){
h(s);
}});
}});
}
else if(q==="group")
{
h(n.getModel("URMData").get(p).toJSON());
}
else{
n.getModel("URMData")[l[q]](p,{sAttr:"oReplyTo",onsuccess:function(r){
h(r);
}});
}
}
}
},replyConvMailPopUp:function(b,c){
var f=this,d=$.$(c).parents("li.ur_l_item"),g=d.attr("mailid"),e=d.find("div.ur_l_expand div.ur_l_reply");
if(!e.size())
{
d.find("div.ur_l_expand .ur_l_content").append(f.getView("replyMailPopUp",f.getReplyAddrs(g).oTos));
}
},sendMail:function(c,d,b){
var g=this,e=$.$(b),j=e.find("textarea"),h=$.$(d),f=h.parents("li[mailid]");
if(!j.attr("value"))
{
j.focus();
getTop().showError("\u8BF7\u586B\u5199\u5185\u5BB9");
return;
}
g.setMailRead([e.attr("mailid")],{onsuccess:function(){
g.setReadDom(f,false);
}});
getTop().showProcess(1,true,"\u90AE\u4EF6\u6B63\u5728\u53D1\u9001\u4E2D...","",false);
j.attr("disabled",true);
g.quickReply(e.attr("mailid"),{sContent:j.attr("value")},{sMailType:f.attr("mailtype"),sConvMailId:f.attr("mailid"),onsuccess:function(){
e.find("div[un='replyArea']").addClass("reply_succ").rmAttr("nReady").html(g.getView("replySuc"));
},onerror:function(){
getTop().showError("\u53D1\u9001\u5931\u8D25");
j.rmAttr("disabled");
h.rmClass("btn_blue_disable").attr("ck","sendMail").html("\u53D1\u9001");
}});
h.addClass("btn_blue_disable").rmAttr("ck").html("\u53D1\u9001\u4E2D");
},cancleSendMail:function(b,c){
$.$(c).parents("div.ur_l_action").find("[ck='replyMailPopUp']").fireEvent("click");
},addNewMail:function(b,c){
var d=this;
},updateSpecifyMail:function(b,c){
},newwinReadConv:function(c,d,b){
var g=this,h=$.$(d),e=h.parents("li[mailid]"),f=g.getModel("URMData").get(e.attr("mailid"));
getTop().goNewWin($.T("/cgi-bin/readmail?folderid=$folderid$&t=readmail_conversation&mailid=$mailid$").replace({mailid:f.id,folderid:f.get("sFolderId")}));
},previewPic:function(c,d,b){
var e=this,f=e.dom$().$(d);
e.previewPic($.$(b).attr("mailid"));
},editOnlineDoc:function(c,d,b){
var e=this,f=_oTop.attr(d,"onlineDocKey"),h=["/cgi-bin/docedit_read?t=online_doc.html&key=",f].join(""),g=[_oTop.location.protocol,"//",_oTop.location.hostname,"/cgi-bin/frame_html?t=newwin_frame&sid=",_oTop.getSid(),"&url=",encodeURIComponent(h)].join("");
_oTop.open('/cgi-bin/docedit_read?t=online_doc.html&key='+f+'&func=webread&sid='+_oTop.getSid(),"_blank");
},exportOnlineDoc:function(c,d,b){
var f=_oTop.attr(d,"onlineDocKey"),g=_oTop.attr(d,"filename"),e=["/cgi-bin/docedit_redirect?func=export&sid=",_oTop.getSid(),"&key=",f,"&name=",encodeURIComponent(g)].join("");
window.open(e,"actionFrame");
},viewOnlineDoc:function(c,d,b){
var e=this,f=_oTop.attr(d,"onlineDocKey"),g=["/cgi-bin/docedit_list?t=online_doc&page=0&pagesize=40&sid=",_oTop.getSid(),"&viewkey=",f].join("");
_oTop.getMainWin().location.href='/cgi-bin/readtemplate?sid='+_oTop.getSid()+'&t=online_doc_webmail';
_oTop.switchFolder("folder_onlinedoc");
},starOnlineDoc:function(c,d,b){
var e=this,f=_oTop.attr(d,"onlineDocKey");
_oTop.QMAjax.send("/cgi-bin/docedit_modify?t=online_doc.json",{content:_oTop.TE(["func=add&key=$sFileId$"]).replace({sFileId:f}),method:"POST",onload:function(g,h){
var k="\u6536\u85CF\u5931\u8D25";
if(g)
{
try{
var j=_oTop.evalValue(h);
if(j.ret==0)
{
_oTop.show(d,false);
$.$(b).find("#span_stared_"+f).show();
return;
}
}
catch(l)
{
}
}
_oTop.showError(k);
}});
},previewAttachment:function(c,d,b){
var e=this,g=getTop(),f=e.dom$().$(d);
function h()
{
e.previewAttach($.$(b).attr("mailid"),{nIdx:f.attr("idx"),sSeq:f.attr("seq")});
}
if(g.attr(d,"ispoison")=="1")
{
e.confirmOpen({msg:"\u9644\u4EF6\u53EF\u80FD\u5305\u542B\u75C5\u6BD2\u6216\u6B3A\u8BC8\u4FE1\u606F\uFF0C\u8BF7\u52FF\u9884\u89C8\u3002",btnTxt:"\u7EE7\u7EED\u9884\u89C8",kvKey:"preview"},function(){
h();
});
return;
}
else{
h();
}
$.preventDefault(c);
},moreOptions:function(e,f,d){
var q=this,l=q.dom$(),s=l.$(f),k=$.$(d),n=s.parents("li[mailid]"),u=k.attr("mailid"),v=QMWin.unikey(),o=[],m={nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:7px; overflow:hidden;"></div>'},c=e.clientY,r=$.T(['<div style="white-space:nowrap;zoom:1;">','<input type="button" class="item_square flagbg$sFlagBg$"/>','<span class="item_square_txt">$sName$ &nbsp</span>','</div>']),t='<div class="right"><img src="/zh_CN/htmledition/images/spacer.gif" class="arrow_meunico" /></div>',b=(getTop()).BaseMailOper,j=b.getInstance(window),g=q.getModel("URMData").get(u).get("nStar")==1;
function h()
{
var z=[],A=q.getModel("URMData").get(u),w=A.get("nXqqStyle");
if(w>=1&&w<=9)
{
}
else{
z.push({sId:"reply",sItemValue:"\u56DE\u590D"});
if(A.get("sType")!="group")
{
z.push({sId:"replyAll",sItemValue:"\u56DE\u590D\u5168\u90E8"});
}
}
z.push({sId:"forwardMail",sItemValue:"\u8F6C\u53D1"});
z.push(m);
z.push({sId:"predeleteMail",sItemValue:"\u5F7B\u5E95\u5220\u9664"});
z.push({sId:"report",sItemValue:"\u4E3E\u62A5"});
z.push(m);
z.push({sId:"markStar",sItemValue:g?"\u53D6\u6D88\u661F\u6807":"\u6807\u8BB0\u661F\u6807"});
z.push(m);
var C=q.getModel("MetaData").get("oTags");
if(A.get("oTags")&&A.get("oTags").length)
{
o.push({sId:"unmarkAllTag",sItemValue:"\u53D6\u6D88\u6807\u7B7E"});
o.push(m);
}
for(i=0,_nLen=C.length;i<_nLen;i++)
{
var B=C[i];
o.push({sId:["markAsTag",B.sId].join("_"),sTagId:B.sId,sTagName:B.sName,sFlagBg:B.sFlagBg,sItemValue:r.replace(B)});
}
o.length&&o.push(m);
o.push({sId:"newTag",sItemValue:"\u65B0\u5EFA\u6807\u7B7E"});
z.push({sId:"tagMail",sItemValue:t+'\u6807\u7B7E',oSubMenu:{oItems:o}});
var x=q.getModel("MetaData").get("oFolders"),y=[];
$.each(x,function(D){
y.push({sId:["moveToFolder",D.sId].join("_"),sFolderId:D.sId,sItemValue:D.sName});
});
y.length&&y.push(m);
y.push({sId:"newFolder",sItemValue:"\u65B0\u5EFA\u6587\u4EF6\u5939"});
z.push({sId:"moveTo",sItemValue:t+'\u79FB\u52A8\u5230',oSubMenu:{oItems:y}});
z.push(m);
z.push({sId:"opennew",sItemValue:"\u65B0\u7A97\u53E3\u6253\u5F00"});
return z;
}
var p=new (getTop()).QMMenu({sId:v,oEmbedWin:window,oItems:h(),onitemclick:function(x,w){
var y=n.find("textarea").attr("value");
if(x.indexOf("_")!=-1)
{
x=x.split("_")[0];
}
switch(x)
{case "unmarkAllTag":
q.cancelTag(u,{sTagId:"",onsuccess:function(){
k.find("span[ui-type='tags']").html("");
}});
break;
case "markAsTag":
q.tag(u,{sTagId:w.sTagId,onsuccess:function(){
getTop().showInfo("\u6DFB\u52A0\u6807\u7B7E\u6210\u529F");
k.find("span[ui-type='tags']").insert(q.getView("tag",{sId:w.sTagId,sName:w.sTagName,sFlagBg:w.sFlagBg}),"beforeEnd");
}});
break;
case "reply":
q.reply(u,{pluscontent:y});
break;
case "replyAll":
q.replyAll(u,{pluscontent:y});
break;
case "forwardMail":
q.forward(u);
break;
case "deleteMail":
q.del(u,{bCompleteDel:false,onsuccess:function(){
k.remove();
q.firstLastItemClass();
}});
break;
case "predeleteMail":
q.del(u,{bCompleteDel:true,onsuccess:function(){
k.fadeOut(function(){
l.$(this).remove();
if(l.find("li[un='mail']").size()===0&&l.find("li.loading_more").css("display")==="none")
{
l.find("ul.ur_list").insert(q.getView("nomails",{}),"afterBegin");
l.find("div.ur_container").addClass("ur_empty");
l.find("[ck='markAllAsRead']").hide();
}
});
}});
break;
case "report":
q.reportSpam(u,{onsuccess:function(){
k.remove();
q.firstLastItemClass();
if(l.find("li[un='mail']").size()===0&&l.find("li.loading_more").css("display")==="none")
{
l.find("ul.ur_list").insert(q.getView("nomails",{}),"afterBegin");
l.find("div.ur_container").addClass("ur_empty");
l.find("[ck='markAllAsRead']").hide();
}
}});
break;
case "markStar":
q.star(u,{bStar:!g,onsuccess:function(){
if(!g)
{
k.attr("mailtype")&&k.addClass("li_mail_stared");
}
else{
k.attr("mailtype")&&k.rmClass("li_mail_stared");
}
}});
break;
case "opennew":
q.setMailRead([u],{onsuccess:function(){
q.setReadDom(n,false);
}});
q.readMailNewFrame(u);
break;
case "print":
q.print(u);
break;
case "moveToFolder":
q.moveTo(u,{sFolderId:w.sFolderId,sFolderName:w.sItemValue,onsuccess:function(){
q.dom$().find("li[mailid='"+u+"']").find("span.ur_l_from").html(w.sItemValue);
}});
break;
case "newFolder":
q.moveTo(u,{sFolderId:"new",sFolderName:"",onsuccess:function(){
getTop().showInfo("\u521B\u5EFA\u6587\u4EF6\u5939\u6210\u529F");
}});
break;
case "newTag":
q.createTag(u,{onsuccess:function(z){
k.find("span[ui-type='tags']").insert(q.getView("tag",{sId:z.sId,sName:z.sName,sFlagBg:z.sFlagBg}),"beforeEnd");
}});
break;
}
},nWidth:"auto",nMaxWidth:180,nMaxItemView:15,nMaxWidth:180,bAnimation:true,onload:function(){
var y=this;
if(y.option("sId")==v)
{
var w=parseInt(y.option("nHeight")),x=parseInt(y.option("nWidth")),z=$.$(f).offset(),A=getTop().calcAdjPos([z.top,z.left+$.$(f).width(),z.top+$.$(f).height(),z.left],x,w,window,3);
debug(getTop().calcPos(f));
y.option("nX",A[3]).option("nY",A[0]);
}
}});
},"/URMail/MetaData/_change:nTotalUnread":function(b,d,c){
var e=this;
e.dom$().find("h1.ur_title span").html("("+d+")");
}});
}});
});
})();
(function(){
var a=$.T('"$sName$"<$sAddr$>');
function b(c)
{
return (c.sName&&c.sAddr)?a.replace(c):"";
}
getTop().loadJsFileToTop(["$js_path$libcompose3e5857.js","$js_path$com/kits/qmpreviewer/js/qmpreviewer493dc5.js"]);
$.createCtrl("urm.maillogic",{sSuper:'TagEventCatcher'},function(e){
var g={_FORWARD:"/cgi-bin/readmail",_REPLY_ALL:"/cgi-bin/readmail",_REPLY:"/cgi-bin/readmail",_PRINT:"/cgi-bin/readmail"},f={_FORWARD:$.TE(["sid=$sid$&mailid=$mailid$&t=compose&s=forward&disptype=$disptype$&sid=$sid$"]),_REPLY_ALL:$.TE(["mailid=$mailid$&plusopener=1&t=compose&s=reply_all&disptype=$disptype$&sid=$sid$"]),_REPLY:$.TE(["mailid=$mailid$&plusopener=1&t=$t$&s=reply&disptype=$disptype$&sid=$sid$&from_wm_newwin=true"]),_PRINT:$.TE(["sid=$sid$&t=readmail_print&s=print&filterflag=true&mailid=$mailid$"])},d={_REFERPART:$.TE(['<div><br></div><div><br></div>','<div style="font-size: 12px;font-family: Arial Narrow;padding:2px 0 2px 0;">','------------------&nbsp;$REFER$&nbsp;------------------','</div>','<div style="font-size: 12px;background:#efefef;padding:8px;">','<div><b>$FROM$</b> ','"$@$eval getTop().htmlEncode($from.sName$)$@$"&lt;$from.sAddr$&gt;; ','</div>','<div><b>$DATE$</b> $date$</div>','<div><b>$TO$</b> $@$for($to$)$@$','"$sName$"<$sAddr$>;','$@$endfor$@$</div>','$@$if($cc.length$)$@$','<div><b >$CC$</b> $@$for($cc$)$@$','"$sName$"<$sAddr$>;','$@$endfor$@$</div>','$@$endif$@$','<div><b>$SUBJECT$</b> $subject$</div>','</div><div><br></div>','$orgcontent$']),_ATT_FW_SEND:$.TE(['/cgi-bin/readmail?sid=$sid$&t=compose&s=forward&disptype=html&from=attachfolder&getSubjectFromAttachName=1','&mailattach=$mailid$|$attachid$|$attachname$|$fileextenal$|$filebyte$']),_READMAIL_CPS_URL:$.TE(['/cgi-bin/readmail?sid=$sid$&plusopener=1&mailid=$mailid$&t=','$@$if($t$)$@$','$t$','$@$else$@$','compose','$@$endif$@$','&s=$s$&disptype=$disptype$'])},c={_ZH_CN:{REFER:"\u539F\u59CB\u90AE\u4EF6",FROM:"\u53D1\u4EF6\u4EBA:",DATE:"\u53D1\u9001\u65F6\u95F4:",TO:"\u6536\u4EF6\u4EBA:",CC:"\u6284\u9001:",SUBJECT:"\u4E3B\u9898:"},_EN_US:{REFER:"Original",FROM:"From:",DATE:"Date:",TO:"To:",CC:"Cc:",SUBJECT:"Subject:"}},h=$.lib("urm.utils");
return ({getReplyAddrs:function(j){
var n=this,k,o=[],m=n.getModel("URMData"),l=m.get(j);
ArrayEx.forEach([l.get("oFrom")].concat(l.get("oToList")),function(p){
if(p.nUin==$.uin())
{
k=p;
}
else{
o.push(p);
}
});
return ({oFrom:k,oTos:o});
},_combineContent:function(k,j){
var q=this,p=q.getModel("URMData"),o=p.getMailJson(k),m=[j],l,r;
try{
l=getTop().goUserInfo.get("getRealUserSignature");
if(l)
{
r=l(o["sFolderId"],o["sSaveFrom"]);
if(r)
{
m.push("<div>&nbsp;</div>"+r);
}
}
}
catch(n)
{
}
if(!o["bNoIncludeArtcle"])
{
var u,t;
if(o.oReplyTo&&o.oReplyTo.length)
{
getTop().E(o.oReplyTo,function(v){
if(v.sAddr===o.oFrom.sAddr)
{
u=v.sName;
t=v.sAddr;
return false;
}
});
}
if(!u)
u=o.oFrom.sName;
if(!t)
t=o.oFrom.sAddr;
var s=d._REFERPART.replace($.extend({},{orgcontent:o["sContent"],to:o["oToList"],cc:o["oReplyCc"],from:{sName:u,sAddr:t},date:o["sDate"],subject:o["sSubject"]},o["sTitlePrefix"]=="1"?c._EN_US:c._ZH_CN));
m.push(s);
}
return m.join("");
},quickReply:function(l,k,j){
var p=this,m=p.getModel("URMData"),o=k||{},n=j||{},q;
getTop().fuck=m;
debug(l);
getTop().waitFor(function(){
debug("baggio test1 : "+l);
_oMail=m.getMailJson(l);
if(n.sMailType==="conv")
{
_oMail=_oMail.oSubMails&&_oMail.oSubMails[0];
}
return !!(getTop().ComposeLib&&_oMail&&_oMail.oReplyTo);
},function(){
l=_oMail.sMailId;
debug("baggio test2 : "+l);
if(j.sMailType==="group")
{
q={qqgroupid:_oMail["sGroupId"]+"@groupmail.qq.com",subject:_oMail["sSubject"]||"\u65E0\u4E3B\u9898",content__html:$.htmlEncode(o.sContent),t:"compose.json",s:"group_send",fmailid:l};
}
else{
q={ReAndFw:"reply",contenttype:"html",from_s:"comm_quick",t:"compose.json",s:"",ReAndFwMailid:l,to:_oMail["oReplyTo"]?ArrayEx.map(_oMail["oReplyTo"],function(r){
return b(r);
}).join("; "):"",cc:_oMail["oReplyCc"]?ArrayEx.map(_oMail["oReplyCc"],function(r){
return b(r);
}).join("; "):"",subject:_oMail["sTitlePrefix"]=="1"?"Re:":"\u56DE\u590D\uFF1A"+_oMail["sSubject"],savesendbox:1,sendname:"",sendmailname:_oMail["sSendMailName"],content:p._combineContent(l,$.htmlEncode(o.sContent))};
}
debug("baggio test : not send now!!");
getTop().ComposeLib.send(q,{sType:n.sMailType==="group"?"group":undefined,oncomplete:function(r,s){
if(r)
{
n.onsuccess&&n.onsuccess();
}
else{
n.onerror&&n.onerror();
}
}});
});
},forward:function(j){
var m=this,l=m.getModel("URMData"),k=l.get(j);
getTop().goNewWin(g._FORWARD+"?"+f._FORWARD.replace({mailid:j,disptype:k.get("sDisptype")}));
},reply:function(k,j){
var n=this,m=n.getModel("URMData"),l=m.get(k);
getTop().goReloadInfoOpener=j;
getTop().goNewWin(g._REPLY+"?"+f._REPLY.replace({t:l.get("sType")=="group"?"compose_group":"compose",mailid:k,disptype:l.get("sDisptype")}));
},replyAll:function(k,j){
var n=this,m=n.getModel("URMData"),l=m.get(k);
getTop().goReloadInfoOpener=j;
getTop().goNewWin(g._REPLY_ALL+"?"+f._REPLY_ALL.replace({plusopener:"1",mailid:k,disptype:l.get("sDisptype")}));
},setMailRead:function(j,k){
var n=this,m=n.getModel("URMData"),l=[];
$.each(j,function(p,o){
l.push(m.get(p));
});
getTop().setMailRead(k.bFlag||false,$.extend(h.getCBInfo(l),{bNoShowFilter:true}));
$.each(j,function(p,o){
m.unreadMail(p,k.bFlag?1:0);
});
k.onsuccess&&k.onsuccess();
},del:function(k,j){
var o=this,m=o.getModel("URMData"),l=m.get(k),n=j||{};
getTop().rmMail(j.bCompleteDel?1:0,$.extend(h.getCBInfo([l]),{oncomplete:function(p,q){
n.onsuccess&&n.onsuccess();
m.removeMail(k);
return true;
}}));
},reportSpam:function(k,j){
var o=this,m=o.getModel("URMData"),l=true,n=j||{};
getTop().reportSpamJson({bBlackList:true},$.extend(h.getCBInfo([m.get(k)]),{oncomplete:function(){
n.onsuccess&&n.onsuccess();
m.removeMail(k);
return true;
}}));
},star:function(k,j){
var n=this,l=n.getModel("URMData"),m=j||{};
getTop().starMail(m.bStar,$.extend(h.getCBInfo([l.get(k)]),{oncomplete:function(){
l.starMail(k,m.bStar?1:0);
m.onsuccess&&m.onsuccess();
}}));
},tag:function(k,j){
var p=this,n=p.getModel("URMData"),m=n.get(k),q=m.get("oTags")||[],o=j||{},r=o.sTagId,l=false;
$.each(q,function(t,s){
if(t&&t.sId===r)
{
l=true;
return true;
}
});
if(!l)
{
getTop().QMTag.setMailTag(r,h.getCBInfo([m]));
n.tagMail(k,r,true);
j.onsuccess&&j.onsuccess();
}
},createTag:function(k,j){
var o=this,m=o.getModel("URMData"),l=m.get(k),p=o.getModel("MetaData").get("oTags"),n=j||{};
getTop().QMTag.newMailTag($.extend(h.getCBInfo([m.get(k)]),{oncomplete:function(q,r){
var s=r.newtag,t={},u;
$.each(r.taglist,function(w,v){
if(w.id==s.id)
{
u=w.flagbg;
return true;
}
});
t={sId:s.id,sName:s.name,sFlagBg:u};
n.onsuccess&&n.onsuccess(t);
o.getModel("MetaData").set("oTags",p.concat([t]));
m.tagMail(k,t.sId,true);
}}));
},cancelTag:function(k,j){
var p=this,m=p.getModel("URMData"),l=m.get(k),q=l.get("oTags"),o=j||{},n=[];
getTop().QMTag.rmTag(o.sTagId,$.extend({},h.getCBInfo([l]),{bNoCheck:true}));
o.onsuccess&&o.onsuccess();
m.tagMail(k,j.sTagId,false);
},moveTo:function(k,j){
var p=this,n=p.getModel("URMData"),l=p.getModel("MetaData").get("oFolders"),o=j||{},m=h.getCBInfo([n.get(k)]);
getTop().moveMailJs(o.sFolderId,o.sFolderName,m.sFid,$.extend(m,{oncomplete:function(q,s,r){
var t=n.get(k);
o.onsuccess&&o.onsuccess();
if(r)
{
p.getModel("MetaData").set("oFolders",l.concat([{sId:r.sDestId,sName:r.sDestName}]));
}
t.set("sFolderName",o.sFolderName);
t.set("sFolderId",o.sFolderId);
return true;
}}));
},print:function(j){
window.open(g._PRINT+"?"+f._PRINT.replace({sid:$.sid(),mailid:j}));
},readMailNewFrame:function(j){
var m=this,l=m.getModel("URMData"),k=l.get(j),n=getTop().rdVer.url(j,k.get("sFolderId"),k.get("totime"),k.get("bAdConv")?3:2,false,0,k.get("issendtime"),k.get("nXqqStyle"));
parseInt(k.get("nSubscribe"))&&(getTop()).ossLog("realtime","all","stat=subscribestat&newmail="+k.get("nUnread")+"&mailid="+j);
getTop().goNewWin(n);
},preview:function(k,j){
var l=this,m=$.T("/cgi-bin/readmail?mailid=$mailid$&sid=$sid$").replace({sid:$.sid(),mailid:k}),n=$.T("$url$&nocheckframe=true&t=attachments&select=$select$").replace({url:m,select:j.sSelect});
window.open(n,"_blank");
},previewPic:function(j){
var m=this,l=m.getModel("URMData").get(j),k=l.get("oInnerPicList");
getTop().waitFor(function(){
return !!getTop().QMPreviewer;
},function(){
function n(p)
{
if(p===k.length||p===-1)
{
return;
}
var q=k[p],r={sName:q.sName,sUrl:q.sUrl,sDown:q.sUrl,sType:"img",sFileIdx:p,sAttid:q.sName};
return r;
}
var o={fNext:function(p){
var q=parseInt(p.sFileIdx)+1;
return n(q);
},fPrev:function(p){
var q=parseInt(p.sFileIdx)-1;
return n(q);
}};
getTop().QMPreviewer.show(n(0),o);
getTop().QMPreviewer.component("");
});
},previewAttach:function(k,j){
var n=this,m=j||{},l=n.getModel("URMData").get(k).getAllAttachList((m.sSeq&&parseInt(m.sSeq))||-1);
getTop().waitFor(function(){
return !!getTop().QMPreviewer;
},function(){
function o(q)
{
var r=l[parseInt(q)];
if(!r)
{
return;
}
return {sName:r.sName,sDown:$.htmlDecode(r.sDownloadUrl),sUrl:$.htmlDecode(r.sPreviewUrl),sTwoDCodeUrl:getTop().twoDCodeImgUrl(r.sDownloadUrl),sType:r.sViewMode,sFileIdx:q,sAttid:r.sName,bIsTimeout:r.bIsTimeout||0,sSuffix:r.sName?(r.sName.split(".").pop()||""):""};
}
var p={fNext:function(q){
var r=parseInt(q.sFileIdx)+1;
return o(r);
},fPrev:function(q){
var r=parseInt(q.sFileIdx)-1;
return o(r);
},fFrwd:function(q){
getTop().goNewWin(d._ATT_FW_SEND.replace({sid:$.sid(),mailid:k,attachid:encodeURIComponent($.htmlDecode(q.sAttid)),attachname:encodeURIComponent($.htmlDecode(q.sName)),fileextenal:q.sSuffix,filebyte:q.sBytesize}));
}};
getTop().QMPreviewer.show(o(m.nIdx),p);
});
},netDiskUpload:function(j,l,k){
var p=this,o=p.getModel("URMData").get(l),n=[l],m=p.getModel("URMData").getAttachment(l,k);
if(o.get("sType")=="normal"||o.get("sType")=="submail")
{
n.push(m.sComposePath||m.sName);
n.push(m.sUrlEncodePath||encodeURIComponent(m.sName));
}
else{
n.push($.locSearch(m.sDownloadUrl)["att"]);
n.push(getTop().encodeURI(m.sName));
}
getTop().QMNetDisk.upload(j,n.join("|"));
},setAttachFlag:function(k,j){
var o=this,m=o.getModel("URMData").get(k),n=j||{},l=o.getModel("URMData").getAttachment(k,j.sAttId),p;
if(m.get("sType")==="group")
{
p=[k,$.locSearch(l.sDownloadUrl)["att"],l.sName,l.nSize].join("|");
}
else{
p=[k,l.sUrlEncodePath,l.sUrlEncodePath,l.nSize].join("|");
}
getTop().attachSetFlag(p,true,function(){
l['nStar']=1;
j.onsuccess&&j.onsuccess();
});
},setAllMailRead:function(j){
var m=this,k=m.getModel("URMData"),l=j||{};
h.xhrSend("/cgi-bin/mail_mgr",{sMethod:"POST",sData:"mailaction=read_all&loc=readtemplate,unreadmail,,110&t=unreadmail.json&subt=allread&"+m.getFoldersQueryString()},function(n){
if(n&&n.errcode)
{
l.onerror&&l.onerror();
}
else{
k.unreadAllMail();
l.onsuccess&&l.onsuccess();
getTop().reloadLeftWin();
}
});
},newTabPreviewAttach:function(k,j){
var l=j||{},m=$.TE(["/cgi-bin/readmail?mailid=$mailid$&sid=$sid$"]).replace({mailid:k,sid:$.sid()}),n=$.TE(["/cgi-bin/readmail?mailid=$mailid$&sid=$sid$&nocheckframe=true&t=attachpreviewer&select=$select$&selectfile=$selectfile$&seq=$seq$"]).replace({mailid:k,sid:$.sid(),url:m,select:(parseInt(l.sSelect)||0)+1,selectfile:l.sSelectFile,seq:l.sSeq});
window.open(n,"_blank");
},jumpNewWin:function(k,j){
var m=this,l=j||{},n=d._READMAIL_CPS_URL.replace({sid:$.sid(),mailid:k,s:"reply_all",disptype:"html",t:l.sMailType==="group"?"readmail_group":""});
getTop().goReloadInfoOpener={pluscontent:l.sContent};
getTop().goNewWin(n);
},fixXFDownload:function(j){
var k=getTop(),l=location.protocol==="https:"?"https://static.xf.qq.com/js/xf/xflib2.0.js":"http://x.soso.com/js/xf/xflib2.0.js";
k.loadJsFile(l,true,k.document,function(){
var m=j.find("a[ck=xfDl]");
if(k.XFLIB&&k.XFLIB.IsXFInstalled())
{
m.each(function(n){
k.show(n,true);
});
}
});
}});
});
})();
(function(a){
var d={every:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l&&!h.call(m,l[j],j,l))
{
return false;
}
}
return true;
},filter:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var k=m.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var l=[];
var n=arguments[1];
for(var j=0;j<k;j++)
{
if(j in m)
{
var o=m[j];
if(h.call(n,o,j,m))
l.push(o);
}
}
return l;
},forEach:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l)
h.call(m,l[j],j,l);
}
},indexOf:function(m){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var o=Object(this);
var j=o.length>>>0;
if(j===0)
{
return -1;
}
var l=0;
if(arguments.length>0)
{
l=Number(arguments[1]);
if(l!==l)
l=0;
else if(l!==0&&l!==(Infinity)&&l!==-(Infinity))
l=(l>0||-1)*Math.floor(Math.abs(l));
}
if(l>=j)
{
return -1;
}
var h=l>=0?l:Math.max(j-Math.abs(l),0);
for(;h<j;h++)
{
if(h in o&&o[h]===m)
{
return h;
}
}
return -1;
},lastIndexOf:function(m){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var o=Object(this);
var j=o.length>>>0;
if(j===0)
{
return -1;
}
var l=j;
if(arguments.length>1)
{
l=Number(arguments[1]);
if(l!==l)
l=0;
else if(l!==0&&l!==(Infinity)&&l!==-(Infinity))
l=(l>0||-1)*Math.floor(Math.abs(l));
}
var h=l>=0?Math.min(l,j-1):j-Math.abs(l);
for(;h>=0;h--)
{
if(h in o&&o[h]===m)
{
return h;
}
}
return -1;
},map:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var k=m.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var l=new Array(k);
var n=arguments[1];
for(var j=0;j<k;j++)
{
if(j in m)
l[j]=h.call(n,m[j],j,m);
}
return l;
},reduce:function(j){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var n=Object(this);
var m=n.length>>>0;
if(typeof j!=="function")
throw new TypeError();
if(m==0&&arguments.length==1)
throw new TypeError();
var l=0;
var h;
if(arguments.length>=2)
{
h=arguments[1];
}
else{
do{
if(l in n)
{
h=n[l++];
break;
}
if(++l>=m)
throw new TypeError();
}
while(true);
}
while(l<m)
{
if(l in n)
h=j.call(undefined,h,n[l],l,n);
l++;
}
return h;
},reduceRight:function(j){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var n=Object(this);
var m=n.length>>>0;
if(typeof j!=="function")
throw new TypeError();
if(m===0&&arguments.length===1)
throw new TypeError();
var l=m-1;
var h;
if(arguments.length>=2)
{
h=arguments[1];
}
else{
do{
if(l in this)
{
h=this[l--];
break;
}
if(--l<0)
throw new TypeError();
}
while(true);
}
while(l>=0)
{
if(l in n)
h=j.call(undefined,h,n[l],l,n);
l--;
}
return h;
},some:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l&&h.call(m,l[j],j,l))
{
return true;
}
}
return false;
},groupBy:function(l){
var k={},j=this;
var h=$.isFunc(l)?l:function(m){
return m[l];
};
e.forEach(j,function(o,m){
var n=h(o,m);
(k[n]||(k[n]=[])).push(o);
});
return k;
}};
var f=Array.prototype,e={},c=function(j,h){
for(var k in j)
{
if(h(j[k],k)===false)
{
break;
}
}
};
c(d,function(h,j){
var l=f[j],k=l||h;
e[j]=function(m){
var n=[].slice.call(arguments);
n.shift();
return k.apply(m,n);
};
});
var b=function(){
};
b.prototype=e;
var g=new b();
g.extendPrototype=function(h){
c(d,function(j,k){
if(!f[k])
{
f[k]=j;
}
});
};
g.ctor=function(){
return e;
};
a.ArrayEx=g;
})(window);
(function(){
var c={},e="_simple_event_obj_",d="_simple_event_handler_";
function b(f,g)
{
return f[g]||(f[g]={});
}
function a(f,g,h)
{
for(var k in f)
{
for(var l in g)
{
if(k==l&&k.indexOf(h)!=-1)
{
return l;
}
}
}
}
c.addEvent=function(h,j,f,g){
var k=b(h,e),l=b(f,d),m=a(k,l,j);
if(!m)
{
m=[Math.random(),j].join(",");
}
k[m]=[f,g||{}];
l[m]=1;
};
c.delEvent=function(g,h,f){
var j=b(g,e),k=b(f,d),l=a(j,k,h);
if(l)
{
delete j[l];
delete k[l];
}
};
c.fireEvent=function(g,h,f){
var k=b(g,e);
for(var m in k)
{
if(new RegExp(","+h+"$").test(m))
{
var j=k[m];
try{
j[0].apply(j[1].oContext,f);
}
catch(l)
{
debug("fireEvent error @js/com/extend/simple_event.js:"+l.message);
}
}
}
};
window.QMSimpleEvent=c;
})();
var QMModelAdaptor=(function(){
return ({addEvent:QMSimpleEvent.addEvent,delEvent:QMSimpleEvent.delEvent,fireEvent:QMSimpleEvent.fireEvent,htmlEncode:getTop().htmlEncode,getValue:function(a,b){
if(!(a&&a[b]))
{
return null;
}
return typeof (a[b])=="function"?a[b]():a[b];
},each:getTop().E,toArr:function(a){
return [].slice.call(a);
},unikey:getTop().unikey,isArr:getTop().isArr,isStr:function(a){
return typeof a=="string";
},isFunc:function(a){
return typeof a=="function";
},isObj:function(a){
return typeof a=="object";
},extend:getTop().extend});
})();
(function(a){
var j=ArrayEx;
var n=[].splice;
var c=function(s){
if(!a.isObj(s))
{
return s;
}
return a.isArr(s)?s.slice():a.extend({},s);
};
var e=function(){
return a.unikey("c");
};
var p=({}).toString;
function o(s,t,z)
{
if(s===t)
{
return s!==0||1/s==1/t;
}
if(s==null||t==null)
{
return s===t;
}
if(s.isEqual&&a.isFunc(s.isEqual))
{
return s.isEqual(t);
}
if(t.isEqual&&a.isFunc(t.isEqual))
{
return t.isEqual(s);
}
var u=p.call(s);
if(u!=p.call(t))
{
return false;
}
switch(u)
{case '[object String]':
return s==String(t);
case '[object Number]':
return s!=+s?t!=+t:(s==0?1/s==1/t:s==+t);
case '[object Date]':
case '[object Boolean]':
return +s==+t;
case '[object RegExp]':
return s.source==t.source&&s.global==t.global&&s.multiline==t.multiline&&s.ignoreCase==t.ignoreCase;
}if(typeof s!='object'||typeof t!='object')
{
return false;
}
var w=z.length;
while(w--)
{
if(z[w]==s)
{
return true;
}
}
z.push(s);
var y=0,x=true;
if(u=='[object Array]')
{
y=s.length;
x=y==t.length;
if(x)
{
while(y--)
{
if(!(x=y in s==y in t&&o(s[y],t[y],z)))
break;
}
}
}
else{
if('constructor' in s!='constructor' in t||s.constructor!=t.constructor)
{
return false;
}
for(var v in s)
{
if(f(s,v))
{
y++;
if(!(x=f(t,v)&&o(s[v],t[v],z)))
break;
}
}
if(x)
{
for(v in t)
{
if(f(t,v)&&!(y--))
break;
}
x=!y;
}
}
z.pop();
return x;
}
var h=function(s,t){
return o(s,t,[]);
};
var f=function(t,s){
return Object.prototype.hasOwnProperty.call(t,s);
};
var b=function(s,t){
return function(){
return s.apply(t,arguments);
};
};
var g=function(t){
if(t==null)
{
return true;
}
if(a.isArr(t)||a.isStr(t))
{
return t.length===0;
}
for(var s in t)
if(f(t,s))
{
return false;
}
return true;
};
var q=function(){
throw new Error('A "url" property or function must be specified');
};
var r=function(s,t){
var u=a.toArr(arguments),v=u[1];
return function(){
var w=u.slice(1).concat(a.toArr(arguments));
if(s)
{
s.apply(w[1],w);
}
else{
t.fire.apply(t,["error"].concat(w));
}
};
};
var d=function(t,s){
var u=function(v){
if(v)
{
this.init_(v);
}
};
u.prototype=a.extend(new t(),s(t.prototype));
u.prototype.constructor=u;
return u;
};
var l=d(Object,function(s){
return ({on:function(){
var t=a.toArr(arguments);
t.unshift(this);
a.addEvent.apply(null,t);
},off:function(){
var t=a.toArr(arguments);
t.unshift(this);
a.delEvent.apply(null,t);
},fire:function(){
var u=this,t=a.toArr(arguments);
a.fireEvent(u,t[0],t.slice(1));
a.fireEvent(u,"all",t);
}});
});
var m=d(l,function(s){
return ({init_:function(t){
t=t||{};
var u=t.attributes;
var w=t.options;
var v;
u||(u={});
if(w&&w.parse)
u=this.parse(u);
if(v=a.getValue(this,'defaults'))
{
u=a.extend({},v,u);
}
if(w&&w.collection)
this.collection=w.collection;
this.attributes={};
this._escapedAttributes={};
this.cid=e('c');
if(!this.set(u,{silent:true}))
{
throw new Error("Can't create an invalid model");
}
delete this._changed;
this._previousAttributes=c(this.attributes);
this.initialize.apply(this,arguments);
},idAttribute:function(){
return "id";
},sync:function(){
},initialize:function(){
},toJSON:function(){
return c(this.attributes);
},get:function(t){
return this.attributes[t];
},escape:function(t){
var u;
if(u=this._escapedAttributes[t])
{
return u;
}
var v=this.attributes[t];
return this._escapedAttributes[t]=a.htmlEncode(v==null?'':''+v);
},has:function(t){
return this.attributes[t]!=null;
},set:function(x,C,z){
var v,u,B;
if(a.isObj(x)||x==null)
{
v=x;
z=C;
}
else{
v={};
v[x]=C;
}
z||(z={});
if(!v)
{
return this;
}
if(v instanceof m)
v=v.attributes;
if(z.unset)
for(u in v)
v[u]=void 0;
if(!this._validate(v,z))
{
return false;
}
if(this.idAttribute() in v)
this.id=v[this.idAttribute()];
var y=this.attributes;
var w=this._escapedAttributes;
var A=this._previousAttributes||{};
var t=this._setting;
this._changed||(this._changed={});
this._setting=true;
for(u in v)
{
B=v[u];
if(!h(y[u],B))
delete w[u];
z.unset?delete y[u]:y[u]=B;
if(this._changing&&h(this._changed[u],B))
{
this.fire('change:'+u,this,B,z);
this._moreChanges=true;
}
delete this._changed[u];
if(!h(A[u],B)||(f(y,u)!=f(A,u)))
{
this._changed[u]=B;
}
}
if(!t)
{
if(!z.silent&&this.hasChanged())
this.change(z);
this._setting=false;
}
return this;
},unset:function(t,u){
(u||(u={})).unset=true;
return this.set(t,null,u);
},clear:function(t){
(t||(t={})).unset=true;
return this.set(c(this.attributes),t);
},fetch:function(u){
u=u?c(u):{};
var t=this;
var v=u.onsuccess;
u.onsuccess=function(w,x,y){
if(!t.set(t.parse(w,y),u))
{
return false;
}
if(v)
v(t,w);
};
u.onerror=r(u.onerror,t,u);
return this.sync.call(this,'read',this,u);
},save:function(v,B,y){
var t,u;
if(a.isObj(v)||v==null)
{
t=v;
y=B;
}
else{
t={};
t[v]=B;
}
y=y?c(y):{};
if(y.wait)
u=c(this.attributes);
var z=a.extend({},y,{silent:true});
if(t&&!this.set(t,y.wait?z:y))
{
return false;
}
var x=this;
var A=y.onsuccess;
y.onsuccess=function(D,F,G){
var E=x.parse(D,G);
if(y.wait)
E=a.extend(t||{},E);
if(!x.set(E,y))
{
return false;
}
if(A)
{
A(x,D);
}
else{
x.fire('sync',x,D,y);
}
};
y.onerror=r(y.onerror,x,y);
var w=this.isNew()?'create':'update';
var C=this.sync.call(this,w,this,y);
if(y.wait)
this.set(u,z);
return C;
},destroy:function(u){
u=u?c(u):{};
var t=this;
var v=u.onsuccess;
var w=function(){
t.fire('destroy',t,t.collection,u);
};
if(this.isNew())
{
return w();
}
u.onsuccess=function(y){
if(u.wait)
w();
if(v)
{
v(t,y);
}
else{
t.fire('sync',t,y,u);
}
};
u.onerror=r(u.onerror,t,u);
var x=this.sync.call(this,'delete',this,u);
if(!u.wait)
w();
return x;
},url:function(){
var t=a.getValue(this.collection,'url')||a.getValue(this,'urlRoot')||q();
if(this.isNew())
{
return t;
}
return t+(t.charAt(t.length-1)=='/'?'':'/')+encodeURIComponent(this.id);
},parse:function(t,u){
return t;
},clone:function(){
return new this.constructor({attributes:this.attributes});
},isNew:function(){
return this.id==null;
},change:function(u){
if(this._changing||!this.hasChanged())
{
return this;
}
this._changing=true;
this._moreChanges=true;
for(var t in this._changed)
{
this.fire('change:'+t,this,this._changed[t],u);
}
while(this._moreChanges)
{
this._moreChanges=false;
this.fire('change',this,u);
}
this._previousAttributes=c(this.attributes);
delete this._changed;
this._changing=false;
return this;
},hasChanged:function(t){
if(!arguments.length)
{
return !g(this._changed);
}
return this._changed&&f(this._changed,t);
},changedAttributes:function(v){
if(!v)
{
return this.hasChanged()?c(this._changed):false;
}
var x,u=false,w=this._previousAttributes;
for(var t in v)
{
if(h(w[t],(x=v[t])))
continue;
(u||(u={}))[t]=x;
}
return u;
},previous:function(t){
if(!arguments.length||!this._previousAttributes)
{
return null;
}
return this._previousAttributes[t];
},previousAttributes:function(){
return c(this._previousAttributes);
},isValid:function(){
return !this.validate(this.attributes);
},_validate:function(t,v){
if(v.silent||!this.validate)
{
return true;
}
t=a.extend({},this.attributes,t);
var u=this.validate(t,v);
if(!u)
{
return true;
}
if(v&&v.onerror)
{
v.onerror(this,u,v);
}
else{
this.fire('error',this,u,v);
}
return false;
}});
});
var k=d(l,function(){
var s={init_:function(t){
t=t||{};
var u=t.models;
var v=t.options;
v||(v={});
if(v.comparator)
this.comparator=v.comparator;
this._reset();
this.initialize.apply(this,arguments);
if(u)
{
this.reset(u,{silent:true,parse:v.parse});
}
},initialize:function(){
},sync:function(){
},model:m,initialize:function(){
},toJSON:function(){
return this.map(function(t){
return t.toJSON();
});
},add:function(B,C){
var v,y,z,A,t,w,u={},x={};
C||(C={});
B=a.isArr(B)?B.slice():[B];
for(v=0,z=B.length;v<z;v++)
{
if(!(A=B[v]=this._prepareModel(B[v],C)))
{
throw new Error("Can't add an invalid model to a collection");
}
if(u[t=A.cid]||this._byCid[t]||(((w=A.id)!=null)&&(x[w]||this._byId[w])))
{
throw new Error("Can't add the same model to a collection twice");
}
u[t]=x[w]=A;
}
for(v=0;v<z;v++)
{
(A=B[v]).on("all",this._onModelEvent,{oContext:this});
this._byCid[A.cid]=A;
if(A.id!=null)
this._byId[A.id]=A;
}
this.length+=z;
y=C.at!=null?C.at:this.models.length;
n.apply(this.models,[y,0].concat(B));
if(this.comparator)
{
this.sort({silent:true});
}
if(C.silent)
{
return this;
}
for(v=0,z=this.models.length;v<z;v++)
{
if(!u[(A=this.models[v]).cid])
continue;
C.index=v;
A.fire('add',A,this,C);
}
this.fire('adds',B,this,C);
return this;
},remove:function(x,y){
var t,v,u,w;
y||(y={});
x=a.isArr(x)?x.slice():[x];
for(t=0,v=x.length;t<v;t++)
{
w=this.getByCid(x[t])||this.get(x[t]);
if(!w)
continue;
delete this._byId[w.id];
delete this._byCid[w.cid];
u=this.indexOf(w);
this.models.splice(u,1);
this.length--;
if(!y.silent)
{
y.index=u;
w.fire('remove',w,this,y);
}
this._removeReference(w);
}
this.fire('removes',x,this,y);
return this;
},get:function(t){
if(t==null)
{
return null;
}
return this._byId[t.id!=null?t.id:t];
},getByCid:function(t){
return t&&this._byCid[t.cid||t];
},at:function(t){
return this.models[t];
},sort:function(u){
u||(u={});
if(!this.comparator)
throw new Error('Cannot sort a set without a comparator');
var t=b(this.comparator,this);
if(this.comparator.length==1)
{
this.models=this.sortBy(t);
}
else{
this.models.sort(t);
}
if(!u.silent)
this.fire('reset',this,u);
return this;
},pluck:function(t){
return j.map(this.models,function(u){
return u.get(t);
});
},reset:function(v,w){
v||(v=[]);
w||(w={});
for(var t=0,u=this.models.length;t<u;t++)
{
this._removeReference(this.models[t]);
}
this._reset();
this.add(v,{silent:true,parse:w.parse});
if(!w.silent)
this.fire('reset',this,w);
return this;
},fetch:function(u){
u=u?c(u):{};
if(u.parse===undefined)
u.parse=true;
var t=this;
var v=u.onsuccess;
u.onsuccess=function(w,x,y){
t[u.add?'add':'reset'](t.parse(w,y),u);
if(v)
v(t,w);
};
u.onerror=r(u.onerror,t,u);
return this.sync.call(this,'read',this,u);
},create:function(u,v){
var t=this;
v=v?c(v):{};
u=this._prepareModel(u,v);
if(!u)
{
return false;
}
if(!v.wait)
t.add(u,v);
var w=v.onsuccess;
v.onsuccess=function(x,y,z){
if(v.wait)
t.add(x,v);
if(w)
{
w(x,y);
}
else{
x.fire('sync',u,y,v);
}
};
u.save(null,v);
return u;
},parse:function(t,u){
return t;
},_reset:function(t){
this.length=0;
this.models=[];
this._byId={};
this._byCid={};
},_prepareModel:function(u,v){
if(!(u instanceof m))
{
var t=u;
v.collection=this;
u=new this.model({attributes:t,options:v});
if(!u._validate(u.attributes,v))
u=false;
}
else if(!u.collection)
{
u.collection=this;
}
return u;
},_removeReference:function(t){
if(this==t.collection)
{
delete t.collection;
}
t.off("all",this._onModelEvent);
},_onModelEvent:function(u,v,t,w){
if((u=='add'||u=='remove')&&t!=this)
{
return;
}
if(u=='destroy')
{
this.remove(v,w);
}
if(v&&u==='change:'+v.idAttribute())
{
delete this._byId[v.previous(v.idAttribute())];
this._byId[v.id]=v;
}
this.fire.apply(this,arguments);
}};
a.each(j.ctor(),function(t,u){
s[u]=function(){
return t.apply(t,[this.models].concat(a.toArr(arguments)));
};
});
return s;
});
window.QMCommModel={inherit:d,qmModel:m,qmCollection:k};
})(QMModelAdaptor);
(function(){
var c=ArrayEx,b=QMCommModel.inherit,d,e;
var a=8;
var g=b(QMCommModel.qmModel,function(){
return ({idAttribute:function(){
return "sMailId";
},getAllAttachList:function(h){
if(this.get('sType')=='group')
{
var k=this.get('oMembers');
var j=k[k.length-Math.max(h||-1,1)];
return (j.oAttachs||[]).concat(j.oBigAttachs||[]);
}
return (this.get("oAttachs")||[]).concat(this.get("oResumeWorks")||[],this.get("oBigAttachs")||[]);
}});
});
var f=b(QMCommModel.qmCollection,function(h){
return ({model:g,parse:function(j){
return j.oMails;
},add:function(j,k){
var l=this;
ArrayEx.forEach(j,function(m){
var n=l.get(m.sMailId);
if(!n)
{
h.add.call(l,m,k);
}
else{
n.set(m,k);
}
});
return l;
},_toList:function(){
var m=this,k={"personal":"\u6211\u7684\u6587\u4EF6\u5939","pop":"\u5176\u4ED6\u90AE\u7BB1"},j=[],n={},l=m.filter(function(o){
return o.get("sType")!="submail";
});
l=c.map(l,function(o){
var p=o.toJSON();
if(o.get("sType")=="conv")
{
p.oSubMails=[];
m.forEach(function(r){
if(r.get("sParentId")==o.id&&r.get("nInList")==1)
{
p.oSubMails.push(r.toJSON());
}
});
}
var q=p.sFolderType||p.sFolderId;
if(!n[q])
{
n[q]=true;
j.push({sFolderId:q,sFolderName:k[p.sFolderType]||p.sFolderName});
}
return p;
});
return ({oList:l,oFolders:j});
},updateList:function(k,j){
var m=this,l=m.get(k)||m.at(0);
$.ajax({sUrl:"/cgi-bin/unread_list?t=unreadmail.json&s=list&ef=js&sid="+$.sid(),sType:"GET",vData:{r:Math.random(),time:l.get("nTime"),where:"after",count:a},onsuccess:function(n,o){
var p=$.evalVal(n||"")||{},r=p.oMails,q;
for(var s=r.length-1;s>=0;s--)
{
q=r[s];
if(q.sType!="submail"&&!m.get(q.sMailId))
{
break;
}
}
if(p.errcode==0)
{
m.add(m.parse(p));
j.onsuccess&&j.onsuccess({oMails:ArrayEx.map(m.models.slice(0,m.models.indexOf(l)),function(t){
return m.getMailJson(t.id);
})});
}
else{
j.onerror&&j.onerror();
}
},onerror:function(){
j.onerror&&j.onerror();
}});
},_getArr:function(j){
var l=this,k=[j];
if(j.get("sType")=="conv")
{
var m=j.get("sMailId");
k.concat(l.filter(function(n){
return n.get("sParentId")==m;
}));
}
return k;
},removeMail:function(j){
var l=this,k=l.get(j);
l.remove(l._getArr(k));
if(k.get("nUnread"))
{
d.set("nTotalUnread",Math.max(d.get("nTotalUnread")-1,0));
}
},tagMail:function(k,l,j){
var p=this,n=p.get(k),o=n.get("oTags");
function m(r,s)
{
for(var t in r)
{
if(s==r[t].sId)
{
return r[t];
}
}
}
if(j)
{
var q=m(d.get("oTags"),l);
if(q&&!m(o,l))
{
o.push(q);
}
}
else if(l)
{
var q=m(o,l);
if(q)
{
o.splice(ArrayEx.indexOf(o,q),1);
}
}
else{
o=[];
}
n.set("oTags",o);
},unreadMail:function(k,j){
var m=this,l=m.get(k);
j=typeof (j)=="undefined"?0:j;
if(l.get("sType")=="submail")
{
return;
}
if(j!=l.get("nUnread"))
{
d.set("nTotalUnread",Math.max(d.get("nTotalUnread")+(j?1:-1),0));
}
l.set("nUnread",j).set("sProcessState","over");
},unreadAllMail:function(){
var j=this;
j.forEach(function(k){
k.set("nUnread",0);
});
d.set("nTotalUnread",0);
},starMail:function(k,j){
var m=this,l=m.get(k);
ArrayEx.forEach(m._getArr(l),function(n){
n.set("nStar",j);
});
},getFirstSubMailInList:function(j){
var m=this,k=m.get(j);
if(k.get("sType")=="conv")
{
var n=m.getMailJson(j).oSubMails,l=ArrayEx.filter(n,function(o){
return o.nInList==1;
});
return l[0];
}
},getAttachment:function(k,j){
var m=this,l;
ArrayEx.some(m.get(k).getAllAttachList(),function(n){
if(n.sAttId==j)
{
return l=n;
}
});
return l;
},getMailJson:function(j){
var l=this,k=l.get(j);
if(k.get("sType")=="conv")
{
var m=ArrayEx.map(l.filter(function(n){
return n.get("sParentId")==k.id;
}),function(n){
var o=n.toJSON();
o.oTags=k.get("oTags");
return o;
});
return $.extend(k.toJSON(),{oSubMails:m});
}
else{
return k.toJSON();
}
},fetchConv:function(k,j){
var n=this,l=n.get(k),m;
j=j||{};
if(l.get("bAll"))
{
j.onsuccess&&j.onsuccess(n.getMailJson(k));
}
else{
$.ajax({sUrl:$.T("/cgi-bin/readmail?t=unreadmail.json&s=conv&ef=js&sid=$sid$&mailid=$mailid$&r=$r$").replace({r:Math.random(),sid:$.sid(),mailid:k}),sType:"GET",onsuccess:function(o){
var p=$.evalVal(o||"")||{};
if(p.errcode==0)
{
n.add(p.oMails);
j.onsuccess&&j.onsuccess(n.getMailJson(k));
}
else{
j.onerror&&j.onerror(p);
}
},onerror:function(){
j.onerror&&j.onerror();
}});
}
},fetchGroup:function(k,j){
var m=this,l=m.get(k);
j=j||{};
if(l.get("bAll"))
{
j.onsuccess&&j.onsuccess(l.toJSON());
}
else{
$.ajax({sUrl:$.T("/cgi-bin/readmail?t=unreadmail.json&s=group&sid=$sid$&mailid=$mailid$&r=$r$").replace({r:Math.random(),sid:$.sid(),mailid:k}),sType:"GET",onsuccess:function(n){
var o=$.evalVal(n||"")||{};
if(o.errcode==0)
{
l.set(o.oMail);
j.onsuccess&&j.onsuccess(l.toJSON());
}
},onerror:function(){
j.onerror&&j.onerror();
}});
}
},fetchContent:function(k,j){
var n=this,m=n.get(k),p,l=m.get("nXqqStyle"),o=m.get("sType");
j=j||{};
if(m.get(j.sAttr||"sContent"))
{
j.onsuccess&&j.onsuccess(m.toJSON());
}
else{
if(o=="submail")
{
p=$.T("/cgi-bin/readmail?t=unreadmail.json&s=submail&mailid=$cmailid$&submailid=$submailid$&sid=$sid$&ef=js").replace({cmailid:m.get("sParentId"),sid:$.sid(),submailid:k});
}
else{
p=$.T("/cgi-bin/readmail?t=unreadmail.json&s=normal&ef=js&sid=$sid$&mailid=$mailid$").replace({sid:$.sid(),mailid:k});
}
$.ajax({sUrl:p,sType:"GET",vData:{r:Math.random()},onsuccess:function(q){
var r=$.evalVal(q||"")||{};
if(r.errcode==0)
{
m.set(r.oMail);
j.onsuccess&&j.onsuccess(m.toJSON());
}
else{
j.onerror&&j.onerror(r);
}
},onerror:function(){
j.onerror&&j.onerror();
}});
}
},setFetchParams:function(j){
this._msParamsData=j;
},_getIframeContent:function(j){
return $.T('<iframe frameborder="no" scrolling="no" height="1" width="680" style="display:block;border:0px;" src="/cgi-bin/readmail?t=unreadmail_normal&sid=$sid$&mailid=$mailid$"></iframe>').replace({sid:$.sid(),mailid:j});
},_batchFetchContent:function(j){
var m=this,l=[],k=function(){
$.each(l,function(n){
var o=m.get(n);
if(o)
{
o.set("sContentStatus","");
}
});
};
$.each(j,function(n,o){
if(n.sContent)
{
return;
}
var p=m.get(n.sMailId);
if(n.sType=="normal"&&n.nXqqStyle>=1&&n.nXqqStyle<=9&&n.nXqqStyle!="3"&&n.nSubscribe!="1")
{
p.set("sContent",m._getIframeContent(n.sMailId));
}
else if(n.sType=="normal"||n.sType=="submail")
{
l.push(n.sMailId);
p.set("sContentStatus","loading");
}
});
$.ajax({sUrl:"/cgi-bin/unread_list",sType:"POST",vData:$.T("type=read&sid=$sid$&t=unreadmail.json&s=contents&ef=js&r=$r$&mailid=$mailids$").replace({mailids:l.join("&mailid="),sid:$.sid(),r:Math.random()}),onsuccess:function(n,o){
var p=$.evalVal(n||"")||{};
if(p.errcode==0)
{
$.each(p.oMails,function(q){
var r=m.get(q.sMailId);
if(r)
{
if(r.get("nSubscribe")=="1"&&/<noscript>\s*<iframe.*?src="http:.*?"><\/iframe>\s*<\/noscript>/.test(q.sContent))
{
r.set("sContent",m._getIframeContent(q.sMailId));
}
else{
r.set(q);
}
r.set("sContentStatus","ready");
}
});
}
else{
k();
}
},onerror:function(){
k();
}});
},fetchPage:function(k,j){
var s=this,r=s.get(k),p=s._toList(),o=p.oList,n=0,l=0,t=$.lib("urm.utils");
for(var u=0,m=o.length;u<m;u++)
{
if(o[u].sMailId==k)
{
n=u+1;
break;
}
}
l=n+a;
j=j||{};
_oResult=o.slice(n,l);
if(_oResult.length>=a||o.length>=s.nTotal)
{
j.onsuccess&&j.onsuccess({oFolders:p.oFolders,oMails:_oResult,nTotal:s.nTotal,bAnyMore:n+_oResult.length<=s.nTotal-1});
}
else{
var q=o[o.length-1];
$.ajax({sUrl:"/cgi-bin/unread_list?"+s._msParamsData,sType:"GET",nTimeout:15000,vData:{sid:$.sid(),t:"unreadmail.json",flag:"unreadlist",s:"list",ef:"js",r:Math.random(),daterange:q?(q.nTime||""):"",folderrange:q?(q.sFolderId||""):"",where:"before",count:a},onsuccess:function(v,w){
var x=$.evalVal(v||"")||{};
if(x.errcode==0)
{
if(!s.nTotal)
{
s.nTotal=x.oMetaData.nTotalUnread;
d.set(x.oMetaData);
}
s.add(s.parse(x));
s._batchFetchContent(x.oMails);
p=s._toList();
_oResult=p.oList.slice(n,l);
j.onsuccess&&j.onsuccess({oMails:_oResult,oFolders:p.oFolders,nLockUnread:x.oMetaData.nLockUnread||0,nTotal:s.nTotal,bAnyMore:n+_oResult.length<=s.nTotal-1});
!j.bPreload&&s.fetchPage(_oResult[_oResult.length-1].sMailId,{bPreload:true});
}
else{
j.onerror&&j.onerror();
}
},onerror:function(){
j.onerror&&j.onerror();
}});
}
}});
});
e=new f({});
d=new QMCommModel.qmModel({});
d.url=function(){
return "/URMail/MetaData/";
};
window.oModels={URMData:e,MetaData:d};
})();
(function(){
var b={dblclick:{expandOrFold:{bPropagable:false}},click:{viewFullPage:{bPropagable:false},expandOrFold:{bPropagable:false},refetchData:{bPropagable:false},showNewMail:{bPropagable:false}}};
var a={viewFullPage:function(c,d){
var j=this,k=getTop(),l=$.target(c).id,m=$.target(c).href;
if(/expandlink_/.test($.target(c).id)||/artTitle_/.test($.target(c).id)||/thumb_/.test($.target(c).id))
{
k.preventDefault(c);
var h=j.getModel("URMData"),f=j._getRightTarget(d),n=f.attr("mailid"),g=h.get(n),e=l.replace("expandlink_",""),p=getTop().rdVer.url(n,g.get("sFolderId"),g.get("totime"),2,false,0,g.get("issendtime"),g.get("nXqqStyle")),o=k.T('<div class="subscri_box"><div class="subscri_title" style="margin-top:12px;"><h1>$sTitle$</h1><span class="graytext">$sAddon$<a class="read_ori" href="$orUrl$" target="_blank"><img class="ico_read_ori" src="http://rescdn.qqmail.com/zh_CN/htmledition/images/rss/newwin.gif" title="\u5728\u65B0\u7A97\u53E3\u9605\u8BFB\u539F\u6587"><span class="underline">\u9605\u8BFB\u539F\u6587</span></a></span></div>');
if(l.indexOf("expandlink_")==-1)
{
e=l.replace("artTitle_","").replace("thumb_","");
}
_sTitle=f.find("a[id='artTitle_"+e+"']").html();
_sHtml=f.find("div[id='itemcontent_"+e+"']").find("div.normal").html();
_sOrUrl=f.find("a[id='expandlink_"+e+"']").attr("href");
p=p.replace("t=readmail","");
_sHtml=_sHtml.replace(/<script[^>]*>(.*)?<\/script>/gi,"");
p+="&t=readmail_unreadbook&idx="+e+"&sTitle="+k.encodeURI(_sTitle)+"&sAddon="+k.encodeURI(_sHtml)+"&orUrl="+_sOrUrl;
k.QMPreviewer.show({sUrl:p,sSuffix:"html",bIsBook:true,sName:o.replace({sTitle:_sTitle,sAddon:_sHtml,orUrl:_sOrUrl}),sType:"doc"},{},{bNoOpt:true});
}
},showNewMail:function(d,e){
var j=this,f=j.newMailCount,c=j.getModel("URMData"),g=c.models.slice(0,f),h=j.dom$().find(".new_mail_tip");
g.forEach(function(l,k){
j.dom$().find("ul.ur_list").insert(j.getView("mails",{"oMails":[l.attributes]}),"afterBegin");
});
j._scrollToTop(j.dom$().find("li.ur_l_item").first(),function(){
h.fadeOut("fast");
h.html(h.html().replace(j.newMailCount,"#nNewMailCount#"));
j.hasLockTip&&$.$(".lock_folder").fadeIn("fast");
j.newMailCount=0;
},{_bOpenAnimate:true});
},refetchData:function(c,d){
var j=this,k='<span class="ico_loader"></span>',f=$.$(d).parents("div.contentDiv"),g=j._getRightTarget(d),l=g.attr("mailtype"),h=$.$(d).parents("li.loading_more"),e=function(m){
var n=m.data(0).nextSibling;
while(n.tagName!="LI")
{
if($.$(n).hasClass("loading_more"))
{
return;
}
n=n.nextSibling;
}
return n;
};
if(h.size())
{
h.html(k);
j._loadMore();
}
else{
f.find("div.error_loading").remove();
f.find("div.ur_l_loading").show();
j._fetchMailDetail(g,j.getModel("URMData").get(g.attr("mailid")).get("sType"),{onsuccess:function(m){
m.find("div.ur_l_loading").hide();
},onerror:function(n,m){
n.find("div.ur_l_loading").hide();
},onbefore:function(m){
(l=="conv")&&m.addClass("conv_expand");
var n=$.$(e(m));
n.addClass("type_expand_next");
m.find("a.action_readall").html("\u6536\u8D77\u5168\u6587");
}});
}
},expandOrFold:function(c,d){
var g=this,f=g._getRightTarget(d),j,e=function(k){
var l=k.data(0).nextSibling;
while(l.tagName!="LI")
{
if($.$(l).hasClass("loading_more"))
{
return;
}
l=l.nextSibling;
}
return l;
};
j=f.attr("mailtype");
if(!f.hasClass("type_expand"))
{
var h=$.target(c);
if(c.type=="dblclick"&&$.$(h).hasClass("ur_l_subject"))
{
return;
}
else{
g.expandOneMail(d,j,{onsuccess:function(k){
g.specialProcess(k.find("div[ui-type='content']").data(0));
g.processQQMailAppH5CardForWebmail(k.find('div.contentDiv').data(0));
g.processSpreadEmailDisPlayForWebmail(k.find('div.contentDiv').data(0));
var w=k.attr("mailid");
g.checkPoison(w);
g.checkOnlineDocStarStatus(k);
k.find("div.ur_l_loading").hide();
var u=k.find("div.attbg"),t=u.find("a[ck='netDiskUpload']");
typeof ($.inWin()['showNetDisk'])!='undefined'&&$.inWin()['showNetDisk'](k.data(0));
getTop().QMNetDisk&&u.size()&&t.size()&&setTimeout(function(){
getTop().QMNetDisk.route("tips","readmail",u.data(0),{offsetTop:90,offsetLeft:t.data(0).offsetLeft+t.data(0).clientWidth/2});
},3000);
g.fixXFDownload(k);
var v=getTop();
var s=k.find('div.contentDiv').data(0);
if(s)
{
var p=0;
var r=0;
var q=(new Date()).getTime();
var o;
function n()
{
if(p&&v.isShow(s))
{
var x=v.calcPos(s,'json');
p-=x.top;
debug('content height fix',p);
if(p>x.height)
{
s.style.height=p+'px';
v.LogKV('readmail|fix|absolute_cont');
if(!o)
{
setTimeout(function(){
v.speedLog('1',o-q,'readmail');
},5000);
o=(new Date()).getTime();
}
}
}
}
var l=false;
function m()
{
l=true;
v.E(s.getElementsByTagName('*'),function(x){
if(x.nodeType!=3)
{
if(v.getStyle(x,'position')=='absolute'&&v.attr(x,id)!="iframe_h5_qmail_card_webmail")
{
p=Math.max(v.calcPos(x,'json').bottom,p);
}
}
});
n();
}
v.E(s.getElementsByTagName('*'),function(x){
if(x.nodeType!=3)
{
if(v.getStyle(x,'position')=='absolute'&&v.attr(x,id)!="iframe_h5_qmail_card_webmail")
{
p=Math.max(v.calcPos(x,'json').bottom,p);
}
if(x.tagName=='IMG')
{
if(r++===0)
{
setTimeout(function(){
if(!l)
{
m();
}
},2000);
}
x.onerror=x.onload=function(){
x.onload=x.onerror=null;
if(--r<=0)
{
m();
}
};
}
}
});
n();
}
},onerror:function(l,k){
l.find("div.ur_l_loading").hide();
},onbefore:function(k){
(j=="conv")&&k.addClass("conv_expand");
var l=$.$(e(k));
l.addClass("type_expand_next");
k.find("a.action_readall").html("\u6536\u8D77\u5168\u6587");
}});
}
}
else{
g.foldOneMail(d,"normal",{onsuccess:function(k){
(j=="conv")&&k.rmClass("conv_expand");
},onbefore:function(k){
var l=$.$(e(k));
k.find("a.action_readall").html("\u5168\u6587&darr;");
l.rmClass("type_expand_next");
}});
}
}};
$.ruleMerge(b,$.lib("urm.libevent").rule());
$.extend(a,$.lib("urm.libevent").events());
$.createCtrl("urm.controller",{sSuper:"urm.maillogic"},function(){
return ({rule:function(){
return b;
},events:function(){
return a;
},init_:function(c){
var d=this;
d._mnStartTime=c.nStartTime;
d._initTagEvent();
d._initDataEvent();
d._initUI();
d.action(c);
getTop().switchFolder("none");
getTop().setGlobalVarValue("unreadlist",1);
var e=getTop();
if(c.bNetdisk)
{
e.loadJsFileToTop(["$js_path$qmnetdisk38a714.js"]);
}
e.waitFor(function(){
return e.QMNetDisk&&e.QMNetDisk.getInfo();
},function(f){
if(f)
{
var g=e.QMNetDisk.getInfo();
if(g.nNum==0)
{
d.dom$().addClass("netdisk_empty");
}
else if(g.nNum>1)
{
d.dom$().addClass("netdisk_multi");
}
else if(g.nNum==1)
{
for(var h in g.oBound)
{
d.dom$().addClass("netdisk_"+h);
}
}
}
});
},_stat:function(){
var c=this;
if(c._mnStartTime)
{
getTop().ossLog("realtime","all","stat=unreadmail&time="+(new Date().valueOf()-c._mnStartTime));
}
c._mnStartTime=null;
},_initUI:function(){
var d=this,c=function(){
$.$(".unread_mail")[$.width()>1050?"addClass":"rmClass"]("ur_bigsize");
};
$.on("resize",function(){
c();
});
c();
},_initDataEvent:function(){
var g=this,e=getTop().QMWebpush&&getTop().QMWebpush.getInst(),d=$.locSearch()["flag"],j=$.locSearch()["groupid"],h=$.locSearch()["folderid"],k=$.locSearch()["tagid"];
g.oLocParams={flag:$.toArr(d).join("&flag="),folderid:h||"all",groupid:j,tagid:k};
g.getModel("URMData").setFetchParams($.T("flag=$flag$&folderid=$folderid$&groupid=$groupid$&tagid=$tagid$").replace(g.oLocParams));
g.newMailCount=0;
g.hasLockTip=false;
function l(m,n)
{
g.getModel("URMData").updateList(null,{onsuccess:function(o){
var p=g.dom$().find(".new_mail_tip"),q=p.data(0).innerHTML;
g.newMailCount++;
($.$(".lock_folder").css("display")!="none")&&(g.hasLockTip=true);
$.$(".lock_folder").hide();
p.data(0).innerHTML=(g.newMailCount>1)?q.replace(g.newMailCount-1,g.newMailCount):q.replace("#nNewMailCount#",g.newMailCount);
(p.css("display")=="none")&&p.fadeIn("fast");
}});
}
if(e&&false)
{
e.addEvent(1,l);
$.addPageUnloadEvent(function(){
e.delEvent(l);
});
}
var c=function(m){
var o=[this.url(),m].join("_"),n=g.events()[o];
n&&n.apply(g,[].slice.apply(arguments,[1]));
};
var f=g.getModel("MetaData");
f.on("all",c,{oContext:f});
},_initTagEvent:function(){
var c=this;
c.$.ctrl("TagEventCatcher",{oDom:c.dom$(),oRule:c.rule(),oEvents:c.events(),oCallObj:c});
return c;
},getFoldersQueryString:function(){
var c=this;
return c.oLocParams.folderid=="all"?"folderid=1&folderid=3&folderid=8&folderid=9&folderid=subscribe&folderid=pop&folderid=personal":("folderid="+c.oLocParams.folderid);
},getView:function(d,c){
return $.lib("urm.view").get(d,c);
},getModel:function(c){
return window.oModels[c];
},dom$:function(){
return this.$.$("#ct");
},foldOneMail:function(d,e,c){
var d=d,e=e,c=c||{},j=c.onsuccess,h=c.onerror,g=c.onbefore,p=this,q,m;
m=p._getRightTarget(d,"normal");
q=m.attr("ur_action");
if(q=="can_fold")
{
if(m.hasClass("type_expand"))
{
var k,l=m.height(),o=m.find("div.ur_l_fold"),n=m.find("div.ur_l_expand");
var f=function(){
g&&g(m);
k=parseInt(m.attr("foldModeHeight__"),10);
o.css("opacity",0.3);
n.fadeIn({oStyle:{opacity:"1,0.3"},oncomplete:function(){
o.fadeIn({oStyle:{opacity:"0.3,1"},vDuration:200});
}});
p._slideDown(m,l,k,{oncomplete:function(r){
m.rmClass("type_expand");
r.attr("ur_action","can_expand");
j&&j(r);
},vDuration:400,bOpenClip:true});
};
if(m.find("div.ur_l_mailhead").offset().top<$.$("body").bodyScroll("scrollTop"))
{
p._scrollToTop(m.find("div.ur_l_mailhead"),function(){
setTimeout(f,200);
},{_bOpenAnimate:true,_nOriginalOffset:parseInt(m.attr("bodyScrollTop__"),10)});
}
else{
f();
}
}
}
else{
j&&j(m);
}
},confirmOpen:function(d,c){
getTop().confirmBox({title:"\u8B66\u544A",msg:['<div class="dialog_f_t" style="margin-top: 2px;font-weight: normal;"> '+d.msg+'</div>'].join(""),confirmBtnTxt:d.btnTxt,cancelBtnTxt:'\u53D6\u6D88',onshow:function(){
gbIsMac||this.S("cancel").focus();
getTop().LogKV("attachanti|readmail|"+(d.kvKey||"total"));
},onreturn:function(e){
e&&(typeof c=="function")&&c();
}});
return false;
},specialProcess:function(f){
var c=this,d=getTop(),l,g;
if(f)
{
try{
l=f.children;
for(var j=0,k=l.length;j<k;j++)
{
if((g=l[j]).nodeType==1)
{
if(g.style.position=="absolute"||g.style.position=="fixed")
{
g.style.position="";
}
}
}
}
catch(h)
{
}
}
},processQQMailAppH5CardForWebmail:function(e){
var c=this,d=getTop(),h;
h=d.finds("a[name='qqmailapp_h5_card_url']",e);
var f=d.finds("table.greetingCard_desktop_table div",e),g=f&&f[0];
g&&g.style&&(g.style.height="370px");
if(h&&(h=h[0]))
{
if(d.supportCss3&&!d.supportCss3("animation"))
{
h.href="javascript:void(0);";
return;
}
var k=(h.href||"").replace(/http:|https:/i,"https:");
if(!/^((https?:)?(\/\/)?)?([^\/]+?.(qq|oa|qq?mail).com)/.test(k))
{
return;
}
var j=d.T(["<div style='width:360px;height:602px;overflow:hidden;position:relative'>","<iframe id='iframe_h5_qmail_card_webmail' src='$url$' width='750' height='1254' frameborder='0' ","style='display: block;position:absolute;top:0px;left:0px;border: 0px;transform:scale($scale$);-ms-transform:scale($scale$);-moz-transform:scale($scale$);-webkit-transform:scale($scale$);-o-transform:scale($scale$);","transform-origin:0 0;-ms-transform-origin:0 0;-moz-transform-origin:0 0;-webkit-transform-origin:0 0;-o-transform-origin:0 0;'></iframe>","</div>"]).replace({url:k+"#noplaybtn",scale:0.48});
d.replaceHTML(h,j);
}
},processSpreadEmailDisPlayForWebmail:function(e){
var c=this,d=getTop(),g,f;
g=d.finds(".qqmail_spread_mail_webmail_content",e);
f=d.finds(".qqmail_spread_mail_not_webmail_content",e);
c.processSysSpreadEmailDisPlayForWebmail(e);
if(!(g&&g.length>0&&f&&f.length>0))
{
return;
}
g=g[0];
f=f[0];
d.show(g,true);
d.show(f,false);
},processSysSpreadEmailDisPlayForWebmail:function(d){
var c=this,e=$.$(d).find("iframe").data(0);
if(!e)
{
return;
}
e["readyHandler"]=function(){
c.processSpreadEmailDisPlayForWebmail(e.contentWindow.document.body);
};
},checkPoison:function(c){
var d=this,e=getTop(),f=c;
e.QMAjax.send(e.T('/cgi-bin/do?action=checkvirus&sid=$sid$&mailid=$mailid$&t=do.json&cacheage=7200&ver=$ver$').replace({sid:e.getSid(),mailid:f,ver:e.CommVer.get("checkPoison")}),{method:"GET",onload:function(g,h){
var r=e.trim(h);
if(g&&r.indexOf("(")==0)
{
var q=e.evalValue(r);
for(var s in q)
{
if(!s)
{
return;
}
if(q[s].isSafe=="0"||q[s].isSpam=="1")
{
d._moWin=e.getMainWin();
var k=e.S(["span_attachIndex_",f,"_",s].join(""),d._moWin);
if(q[s].isSafe=="0")
{
k.style.display="";
e.attr(k,"poisonname",q[s].virus);
e.S(["span_",f,"_safe"].join(""),d._moWin).style.display="none";
}
var o=k&&k.parentNode&&k.parentNode.parentNode,m=e.finds("div.down_big",o),n=e.finds("a",o.parentNode);
if(m&&m.length>0&&(m=m[0]))
{
var j=e.finds("a",m);
if(j&&j.length>0)
{
e.E(j,function(t){
if(/\u4E0B\u8F7D/.test(t.innerHTML))
{
t.href+="&kvclick=attach|poison|download";
t.onclick=function(u){
e.preventDefault(u||d._moWin.event);
d.confirmOpen({msg:"\u9644\u4EF6\u53EF\u80FD\u5305\u542B\u75C5\u6BD2\u6216\u6B3A\u8BC8\u4FE1\u606F\uFF0C\u8BF7\u52FF\u4E0B\u8F7D\u3002",btnTxt:"\u7EE7\u7EED\u4E0B\u8F7D",kvKey:"download"},function(){
e.goUrlMainFrm(t.href,false,true);
});
};
}
else if(/previewAttach/i.test(e.attr(t,'ck')))
{
e.attr(t,"ispoison","1");
}
});
}
}
if(n&&n.length>0)
{
e.E(n,function(t){
if(/previewAttach/i.test(e.attr(t,'ck')))
{
e.attr(t,"ispoison","1");
return false;
}
});
}
var l=e.S("attach_tools_download_"+s,d._moWin),p=e.S("attach_tools_preview_"+s,d._moWin);
p&&(e.attr(p,"ispoison","1"));
if(l)
{
l.onclick=(function(t){
return function(u){
d.confirmOpen({msg:"\u9644\u4EF6\u53EF\u80FD\u5305\u542B\u75C5\u6BD2\u6216\u6B3A\u8BC8\u4FE1\u606F\uFF0C\u8BF7\u52FF\u4E0B\u8F7D\u3002",btnTxt:"\u7EE7\u7EED\u4E0B\u8F7D",kvKey:"download"},function(){
e.goUrlMainFrm(t[0].href,false,true);
});
e.preventDefault(u);
};
})(l);
}
}
}
}
}});
},checkOnlineDocStarStatus:function(c){
var j=this,k=getTop(),d=c,l="/cgi-bin/docedit_read?t=online_doc.json&func=checkstar&sid="+k.getSid()+"&key=";
var e=k.finds("div.att_bt a[ck='starOnlineDoc']",d.data(0)||j._moWin),h={},g=[],f;
if(e&&e.length>0)
{
k.E(e,function(m){
f=k.attr(m,"onlinedockey");
g.push(f);
h[f]=m;
});
}
else{
return;
}
l+=g.join("&key=");
k.QMAjax.send(l,{method:"GET",onload:function(m,n){
if(m)
{
var p=k.evalValue(n);
if(p.ret==0)
{
var o=p.oList;
k.E(o,function(q){
if(q.bHasDeleted)
{
var t=k.parents("div.att_bt",h[q.sFileId])[0],r=k.finds("span.graytext",t)[0],s=k.finds("div[ck='editOnlineDoc']",t)[0];
r.innerHTML=r.innerHTML.replace(/\(([\s\S]*)\)/,function(v,u){
return ["(",u,", <span class='txt_red'>\u6587\u6863\u5DF2\u5220\u9664</span>)"].join("");
});
k.attr(s,"ck","");
k.removeSelf(k.parents("div.down_big",h[q.sFileId])[0]);
}
else if(q.sStarStatus=="1")
{
k.show(h[q.sFileId],false);
d.$("#span_stared_"+q.sFileId).show();
}
});
}
}
}});
},expandOneMail:function(d,e,c){
var d=$.$(d).data(0),e=e||"normal",c=c||{},k=c.onsuccess,j=c.onerror,h=c.onclose,g=c.onbefore,t,r=this,n,q;
n=r._getRightTarget(d);
t=n.attr("ur_action");
if(t=="can_expand")
{
if(!n.hasClass("type_expand"))
{
var l,u=n.attr("mailid"),m=n.height(),f=!n.find("div[ui-type='content']").data(0).childNodes.length,s=r.getModel("URMData"),p=s.get(u);
if(f)
{
var o=s.get(u).toJSON();
if(e=="conv")
{
o=s.getFirstSubMailInList(u);
}
r._setMailContent(n.find("div[ui-type='content']"),o.sDisptype,o.sContent);
f=!o.sContent;
}
n.attr("foldModeHeight__",n.height());
n.addClass("type_expand").find("div.ur_l_expand").fadeIn({oStyle:{opacity:"0.3,1"}});
n.attr("bodyScrollTop__",$.$("body").bodyScroll("scrollTop"));
l=n.height();
g&&g(n);
f&&n.find("div.ur_l_loading").show();
r._slideDown(n,m,l,{oncomplete:function(v){
v.attr("ur_action","can_fold");
f?r._fetchMailDetail(n,e,c):(k&&k(n));
}});
parseInt(p.get("nSubscribe"))&&(getTop()).ossLog("realtime","all","stat=subscribestat&newmail="+p.get("nUnread")+"&mailid="+u);
if(p.get("nUnread")==1)
{
r.setMailRead([u],{onsuccess:function(v){
n.find("span.ur_symbol").hide().attr("title","\u5DF2\u8BFB").addClass("symbol_readed").show();
n.find("a[ck='markUnread']").rmClass("uri_stared").addClass("uri_star").html("\u6807\u4E3A\u672A\u8BFB").show();
n.find("a[ck='markAsRead']").parent("span").remove();
}});
}
}
}
else{
k&&k(n);
}
},_setMailContent:function(c,e,d){
if(d)
{
c.html(d);
setTimeout(function(){
getTop().swapLink(c.data(0),e,$.inWin(c.data(0)),c.parents('.ur_l_item').attr('mailid'));
});
}
},_slideDown:function(c,j,k,e){
var d=e||{},g=e.oncomplete,f=e.bOpenClip||false,h=e.vDuration||"normal",l=e.sEasing||"Linear";
if(j<k)
{
k=k>600?600:k;
}
else{
j=j>600?600:j;
}
c=$.$(c);
if($.isBrowser("ie6"))
{
c.css("height",k);
g&&g(c);
return;
}
c.slideDown({oStyle:{height:[j,k].join(",")},vDuration:h,sEasing:l,oncomplete:function(){
g&&g(c);
}});
},_fetchMailDetail:function(c,e,d){
var n=this,d=d||{},j=d.onsuccess,g=d.onerror,o=n.getView("errorloading"),k=$.$(c),f=function(q){
k.find("div[ui-type='content']").html(o);
g&&g(k,q);
},h=function(r,s,t,q){
n._slideDown(r,s,t,{oncomplete:function(u){
j&&j(u,q);
}});
};
if(e=="normal")
{
n.getModel("URMData").fetchContent(k.attr("mailid"),{onsuccess:function(q){
if(q.sContent.indexOf("<iframe")==0)
{
var t=k.find("div.contentDiv");
if(t.find("iframe").size()==0)
{
var s=k.height();
var r=function(){
k.find("iframe").data(0)["dblclickHandler"]=function(){
k.find("a.uri_packup").fireEvent("click");
};
h(k,s,k.height(),q);
};
t.find("div[ui-type='content']").html(q.sContent);
t.find("iframe").data(0)["loadHandler"]=r;
t.find("iframe").data(0)["readyHandler"]=function(){
k.find("div.ur_l_loading").hide();
};
}
}
else{
var s=k.height();
k.find("div.contentDiv").css("opacity",1);
n._setMailContent(k.find("div[ui-type='content']"),q.sDisptype,q.sContent);
h(k,s,k.height(),q);
k.find("div.ur_l_content").find(".ur_tags").html(n.getView("tagCopy",q.oTags));
}
},onerror:f});
}
else if(e=="group")
{
n.getModel("URMData").fetchGroup(k.attr("mailid"),{onsuccess:function(q){
var r=k.height(),s;
k.find("div.contentDiv").css("opacity",1);
n._setMailContent(k.find("div[ui-type='content']"),q.sDisptype,n.getView("readgroupmail",q));
s=k.height();
h(k,r,s,q);
},onerror:f});
}
else{
var m=k,p=m.attr("mailid"),l=n.getModel("URMData").getFirstSubMailInList(p);
n.getModel("URMData").fetchContent(l.sMailId,{onsuccess:function(q){
var t=m.find("div.ur_l_expand"),u=t.parents("li.ur_l_item"),r=t.height(),s;
t.find("div.contentDiv").css("opacity",1);
n._setMailContent(t.find("div[ui-type='content']"),q.sDisptype,q.sContent);
s=t.height();
h(t,r,s,q);
},onerror:f});
}
},_monitorMailUnRead:function(){
var d=this;
$.addEvent("scroll",function(){
var g=d.dom$().find("li.loading_more"),f=$.$("body"),e=d._mnScrollTop=Math.max(f.bodyScroll("scrollTop"),d._mnScrollTop||0);
g.css("display")!="none"&&e+f.bodyScroll("clientHeight")>=g.offset().top-100&&d._loadMore();
});
var c=function(){
d._mnScrollTop=1;
};
if($.isBrowser("firefox"))
{
document.body.addEventListener("DOMMouseScroll",c);
}
else{
document.body.onmousewheel=c;
}
document.body.focus();
},_scrollToTop:function(d,c,e){
var d=$.$(d),e=e||{},f=e._bOpenAnimate||false,c=c,g=$.$("body").scrollTop(),j,h=e._nOriginalOffset,k=$.$("body");
j=h?h:d.offset().top-15;
if(!f)
{
$.bodyScroll("scrollTop",d.offset().top||0);
}
else{
$.$("body").animate({},{onstep:function(l){
k.bodyScroll("scrollTop",g-(g-j)*l);
},oncomplete:function(){
c&&c();
},sEasing:"easing",vDuration:200});
}
},firstLastItemClass:function(){
var d=this,c=d.dom$().find("ul.ur_list li.ur_l_item");
c.first().data(0)&&c.first().addClass("first_item");
c.last().data(0)&&c.last().addClass("last_item");
},classifyByFolders:function(c){
var g=this,f;
for(var h in c)
{
var e=c[h],d=g.dom$().find("ul.ur_list a[folder='"+e.sFolderId+"']"),f=g.dom$().find("ul.ur_list li[folder='"+e.sFolderId+"']");
if(f.size()&&!d.size())
{
$.$(f.data(0)).insert(g.getView("foldersep",e),"beforeBegin");
}
}
},_loadMore:function(){
var d=this,e=d.getModel("URMData"),c=d.dom$().find("ul.ur_list li.ur_l_item").last();
if(d._mbLoadingMore)
{
return;
}
d._mbLoadingMore=true;
e.fetchPage(c.size()?c.attr("mailid"):"",{onsuccess:function(f){
if(f.nLockUnread=="1")
{
$.$("div.lock_folder").show().fadeIn();
}
if(f.nTotal+d.dom$().find("li.ur_l_item").size()==0)
{
d.dom$().find("ul.ur_list").insert(d.getView("nomails",{}),"afterBegin").find("li.loading_more").hide();
d.dom$().find("div.ur_container").addClass("ur_empty");
d.dom$().find('a[ck="markAllAsRead"]').hide();
return;
}
var k=getTop();
if(k.getOnlineAttachInfo)
{
f.isOnlineDocOpen=(k.getOnlineAttachInfo()||{}).sOpen;
}
d.dom$().find("ul li.loading_more").rmClass("loading_all").insert(d.getView("mails",f),"beforeBegin");
d.classifyByFolders(f.oFolders);
d.dom$().find("ul.ur_list li").first().addClass("first_item");
if(!f.bAnyMore||!f.oMails.length)
{
d.dom$().find("li.loading_more").hide();
}
if(!f.bAnyMore)
{
var j=d.dom$().find("li.ur_l_item"),g=j.size(),h=$.$(j.data(g-1));
h.addClass("last_item");
}
d._mbLoadingMore=false;
d._stat();
},onerror:function(){
var f=d.dom$().find("ul li.loading_more");
d._mbLoadingMore=false;
f.addClass("loading_all").html(d.getView("errorloading"));
}});
},_getRightTarget:function(c){
if(c.tagName=="LI"&&$.$(c).hasClass("ur_l_item"))
{
_oDom$=$.$(c);
}
else{
_oDom$=$.$(c).parents("li.ur_l_item");
}
return _oDom$;
},_startMonitor:function(){
var c=this,d=c.getModel("URMData");
setInterval(function(){
if(!c._mnScrollTop)
{
return;
}
var r=[],p=[],n=$.$("body"),m=n.bodyScroll("scrollTop"),l=n.bodyScroll("scrollHeight"),h=n.bodyScroll("clientHeight"),j=m+getTop().bodyScroll(getTop().document,"clientHeight")*0.3,g=m+h,f=g+10>l,q=d.models;
for(var u=0,k=q.length;u<k;u++)
{
var e=q[u];
if(e.get("sType")!="submail"&&e.get("nUnread")==1&&e.get("sProcessState")!="over")
{
var t=e.id,o=c.dom$().find("ul li.ur_l_item[mailid='"+t+"']"),s=o.offset();
if(!s)
{
continue;
}
if(!f&&s.top>j)
{
break;
}
e.set("sProcessState","over");
r.push(t);
p.push(o);
}
}
r.length&&c.setMailRead(r,{onsuccess:function(v){
$.each(p,function(w){
w.find("span.ur_symbol").hide().attr("title","\u5DF2\u8BFB").addClass("symbol_readed").show();
});
p=r=null;
}});
},1000);
},setReadDom:function(d,c){
if(c)
{
d.find("a[ck='markUnread']").hide().insert(this.getView("setread"),"afterEnd");
d.find("span.ur_symbol").rmClass("symbol_readed");
if(d.attr("ur_action")==="can_fold")
{
d.find("a[ck='expandOrFold']").fireEvent("click");
}
}
else{
d.find("span.ur_symbol").hide().attr("title","\u5DF2\u8BFB").addClass("symbol_readed").show();
d.find("a[ck='markUnread']").rmClass("uri_stared").addClass("uri_star").html("\u6807\u4E3A\u672A\u8BFB").show();
d.find("a[ck='markAsRead']").parent("span").remove();
}
},action:function(c){
var d=this;
d.dom$().html(d.getView("container"));
d._loadMore();
(getTop()).setDblClickNoSel(d.dom$().data(0));
d._startMonitor();
d._monitorMailUnRead();
}});
});
})();
