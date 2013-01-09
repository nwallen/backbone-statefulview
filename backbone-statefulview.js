// Backbone-StatefulView.js v0.1
//
// extends Backbone.View to track states
// Inspired by http://robdodson.me/blog/2012/06/02/managing-your-backbone-views-with-the-state-pattern/
// 
// Copyright (c) 2013, Nicholas Wallen
// Backbone-StatefulView may be freely distributed under the MIT license

(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module, if available
        define(['underscore', 'backbone'], factory);
    } else {
        // Browser globals for non-AMD
        factory(_, Backbone);
    }

}(function(_, Backbone){

    Backbone.StatefulView = Backbone.View.extend({
        
        // state template to ensure that each state has the required methods
        stateTemplate: {
            
            // called when the state is added to view 
            initialize: function (view) {
                this.view = view;
            },  

            // sets up the state when it is activated
            enter: function () {},    
            
            // called after enter
            activate: function () {},    

            // called before exit
            deactivate: function () {},            
            
            // cleans up the state when it is deactivated
            exit: function () {} 
            
        },
        
        // state that all view states will inherit
        baseState: {},

        // active state
        state: undefined,

        // state selected before current state
        previousState: undefined,

        // adds new states to the view 
        // expects { statename:{statemethods} }
        addViewStates: function (states) {
            // iterate through the states argument object
            _.each( states, function (state, name) {
                    // copy state template object
                    var stateTemplate = _.clone(this.stateTemplate);
                    // copy base state object
                    var baseState = _.clone(this.baseState);
                    // extend the state template
                    var mergedBaseState = _.extend(stateTemplate, baseState);
                    // extend the copied base state
                    var mergedState = _.extend(mergedBaseState, state);
                    // add to available states
                    this.states = this.states || {}; 
                    this.states[name] = mergedState;
                    this.states[name].initialize(this);

            }, this);


            return this;
        },

        // sets active state
        setViewState: function (state) {
            if(this.state !== state){
                if(this.state){
                    // keep a reference to the previous state
                    this.previousState = this.state;
                    this.state.deactivate();
                    this.state.exit();
                }
                this.state = state;
                this.state.enter();
                this.state.activate();
            }

            return this;
        },    
    });

}));

