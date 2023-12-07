"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),PropTypes=require("prop-types"),actioncable=require("actioncable"),{Provider,Consumer}=React.createContext();class ActionCableProvider extends React.Component{UNSAFE_componentWillMount=function(){this.cable=this.props.cable?this.props.cable:actioncable.createConsumer(this.props.url)};componentWillUnmount=function(){!this.props.cable&&this.cable&&this.cable.disconnect()};UNSAFE_componentWillReceiveProps=function(a){// Props not changed
this.props.cable===a.cable&&this.props.url===a.url||(// cable is created by self, disconnect it
// create or assign cable
this.componentWillUnmount(),this.UNSAFE_componentWillMount())};render=function(){return React.createElement(Provider,{value:{cable:this.cable}},this.props.children||null)}}ActionCableProvider.displayName="ActionCableProvider",ActionCableProvider.propTypes={cable:PropTypes.object,url:PropTypes.string,children:PropTypes.any};class ActionCableController extends React.Component{componentDidMount=function(){this.connectToChannel()};connectToChannel=function(){var a=this.props,b=a.onReceived,c=a.onInitialized,d=a.onConnected,e=a.onDisconnected,f=a.onRejected;this.cable=this.props.cable.subscriptions.create(this.props.channel,{received:function(a){b&&b(a)},initialized:function(){c&&c()},connected:function(){d&&d()},disconnected:function(){e&&e()},rejected:function(){f&&f()}})};disconnectFromChannel=function(){this.cable&&(this.props.cable.subscriptions.remove(this.cable),this.cable=null)};componentDidUpdate=function(a){JSON.stringify(a.channel)!==JSON.stringify(this.props.channel)&&(this.disconnectFromChannel(),this.connectToChannel())};componentWillUnmount=function(){this.disconnectFromChannel()};send=function(a){if(!this.cable)throw new Error("ActionCable component unloaded");this.cable.send(a)};perform=function(a,b){if(!this.cable)throw new Error("ActionCable component unloaded");this.cable.perform(a,b)};render=function(){return this.props.children||null}}ActionCableController.displayName="ActionCableController",ActionCableController.propTypes={cable:PropTypes.object,onReceived:PropTypes.func,onInitialized:PropTypes.func,onConnected:PropTypes.func,onDisconnected:PropTypes.func,onRejected:PropTypes.func,children:PropTypes.any};class Component extends React.Component{render=function(){return React.createElement(Consumer,null,a=>{let{cable:b}=a;return React.createElement(ActionCableController,{cable:b,...this.props,ref:this.props.forwardedRef},this.props.children||null)})}}Component.displayName="ActionCableConsumer",Component.propTypes={onReceived:PropTypes.func,onInitialized:PropTypes.func,onConnected:PropTypes.func,onDisconnected:PropTypes.func,onRejected:PropTypes.func,children:PropTypes.any};var ActionCableConsumer=React.forwardRef(function(a,b){return React.createElement(Component,{...a,forwardedRef:b},a.children||null)});class ActionCable extends React.Component{componentDidMount=function(){console.warn("DEPRECATION WARNING: The <ActionCable /> component has been deprecated and will be removed in a future release. Use <ActionCableConsumer /> instead.")};render=function(){return React.createElement(ActionCableConsumer,{...this.props},this.props.children||null)}}// Compatible old usage
ActionCable.displayName="ActionCable",ActionCable.propTypes={onReceived:PropTypes.func,onInitialized:PropTypes.func,onConnected:PropTypes.func,onDisconnected:PropTypes.func,onRejected:PropTypes.func,children:PropTypes.any},exports.ActionCable=ActionCable,exports.ActionCableConsumer=ActionCableConsumer,exports.ActionCableController=ActionCableController,exports.ActionCableProvider=ActionCableProvider,exports.default=ActionCableProvider;