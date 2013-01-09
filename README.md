backbone-statefulview
=====================

extends Backbone.View to manage view states. Inspired by http://robdodson.me/blog/2012/06/02/managing-your-backbone-views-with-the-state-pattern/

Provides Backbone.StatefulView which helps you keep a Backbone app tidy  with states. These let you do useful things like automatically unbind events or call different render methods based on the view's state.

Example:


    Backbone.StatefulView.extend({
    
        // all my states will inherit this state
        baseState: {     
             enter: function () {
                console.log('base state is entered');   
             },   
             
             exit: function () { 
               console.log('base state is exited');   
             },   
        },

        // these are the states for my view
        myStates: {
            foo: {
                 
                 enter: function () {      
                   console.log('state foo is entered');   
                 },   
                 
                 exit: function () { 
                   console.log('state foo is exited');   
                 },   
                
            },

            bar: {
                 
                 enter: function () { 
                   console.log('state bar is entered');   
                  },   
                 
                 exit: function () {
                  
                   console.log('state bar is exited');   
                     
                  },   
                
            },
        },


        initialize: function () {
            // call addViewStates to add states to this view. 
            // creates a 'states' object to hold initialized view states
            this.addViewStates(this.theseStates);
            // call setViewState to set the state of the view
            this.setViewState(this.states.foo);
            this.setViewState(this.states.bar);
        },
         
    });

