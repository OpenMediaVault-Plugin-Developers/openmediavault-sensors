/**
 * Copyright (C) 2013 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/data/Store.js")
// require("js/omv/data/Model.js")
// require("js/omv/form/plugin/LinkedFields.js")

Ext.define("OMV.module.admin.service.sensors.Settings", {
    extend : "OMV.workspace.form.Panel",

    rpcService   : "Sensors",
    rpcGetMethod : "getSettings",
    rpcSetMethod : "setSettings",

    initComponent : function () {
        var me = this;

        me.on('load', function () {
        var me = this;
            var colourmField = me.findField('buttonvalues');
            var colors = colourmField.getValue();

            //var colourmField = me.findField('colourmHidden');
            //var colourmPicker = me.findField('colourc');
            //colourmPicker.setValue(colourmField.getValue());
            Ext.Msg.alert('Testing: ' + colors);
        });
        me.callParent(arguments);
    },


    getFormItems : function() {
        var me = this;
        var colors = {
            colourc: '000000',
            colour1: 'FFFFFF',
            colour2: 'FF0000',
            colour3: 'FF0000',
            colour4: 'FF0000',
            colour5: 'FF0000',
            colour6: 'FF0000',
            colour7: 'FF0000',
            colour8: 'FF0000'
        };
        //var colors=document.getElementById("buttonvalues");
        //    var colourmField = me.findField('buttonvalues');
        //    var k = colourmField.getValue();
        //    var l = this.callParent(arguments);
        //    return l;
        //}
        //var colors = me.colors;
        //var colourmField = findField('buttonvalues');
        //var colors = colourmField.getValue();
        //Ext.Msg.alert('Testing: ' + colors);

        //Ext.onReady(function(){
        //    var colourmField = form.findField('buttonvalues');
        //    var colors = colourmField.getValue();
        //    Ext.Msg.alert('Testing: ' + colors);
        //});

        //var hiddenValue = document.getElementById('buttonvalues');
        //var colors = getColors();

        //var colors = function(colors){
        //    var colourmField = form.findField('buttonvalues');
        //    var l = colourmField.getValue();
        //    return l;
        //};

        var updateColors = function (colormenuitem, rgb) {
            colors[colormenuitem.itemId] = rgb.toString();
            colormenuitem.up('form').down('#buttonvalues').setValue(Ext.encode(colors));
        };


        Ext.Msg.alert('background-color10: ' + colors);

        return [{
            xtype    : 'fieldset',
            id       : 'first',
            title    : 'Items to monitor',
            defaults : {
                labelSeparator : ""
            },
            items : [{
                xtype      : 'checkbox',
                name       : 'cpuenable',
                boxLabel   : _("Will monitor CPU Temperature"),
                fieldLabel : _("CPU Temperature"),
                listeners  : {
                    change: this.toggleDisabled,
                    scope: this
                },
                checked    : false
            },{
                xtype  : 'hiddenfield',
                id     : 'buttonvalues'
            },{
                xtype  : 'button',
                name   : 'colours',
                text   : _("Choose Colours"),
                cls    : 'menubutton-main',
                style  : {
                    marginTop       : "10px",
                    marginBottom    : "10px"
                },
                menu: [{
                    text: 'Main CPU Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colourc',
                        value  : colors.colourc,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 1 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour1',
                        value  : colors.colour1,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 2 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour2',
                        value  : colors.colour2,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 3 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour3',
                        value  : colors.colour3,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 4 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour4',
                        value  : colors.colour4,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 5 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour5',
                        value  : colors.colour5,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 6 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour6',
                        value  : colors.colour6,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 7 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour7',
                        value  : colors.colour7,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                },{
                    text: 'Core 8 Colour',
                    menu: {
                        xtype  : 'colormenu',
                        itemId : 'colour8',
                        value  : colors.colour8,
                        cls    : 'menubutton-class',
                        handler: updateColors
                    }
                }]
            },{
                xtype      : 'checkbox',
                name       : 'cpufanenable',
                boxLabel   : _("Will monitor CPU fan speed - Not implemented"),
                fieldLabel : _("CPU Fan Speed"),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'sysfanenable',
                boxLabel   : _("Will monitor system fan speed - Not implemented"),
                fieldLabel : _("SYS Fan Speed"),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'mbtemp',
                boxLabel   : _("Will monitor Motherboard Temperature - Not implemented"),
                fieldLabel : _("MB Temperature"),
                checked    : false
            }]
        }];
    },

    toggleDisabled: function(checkbox, newValue, oldValue) {
        var toggleFn = newValue ? 'enable' : 'disable';

        Ext.each(this.query('button[cls="menubutton-main"]'), function(item) {
            item[toggleFn]();
        });
    },

    onUpdateButton: function(colormenuitem, rgb) {
        var updateColors = function (colormenuitem, rgb) {
            colors[colormenuitem.itemId] = rgb.toString();
            colormenuitem.up('form').down('#buttonvalues').setValue(Ext.encode(colors));
        };
        //var buttonVars = new Array();
        //Ext.Array.each(Ext.ComponentQuery.query('colormenu', Ext.getCmp('first')), function(colormenu){
        //    buttonVars.push(colormenu.value);
        //});
    },


    getColors: function() {
        var me = this;

        me.on('load', function () {
            var colourmField = me.findField('buttonvalues');
            var colors = colourmField.getValue();
            Ext.Msg.alert('Testing: ' + colors);
        });
        me.callParent(arguments);
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : "settings",
    path      : "/service/sensors",
    text      : _("Settings"),
    position  : 10,
    className : "OMV.module.admin.service.sensors.Settings"
});