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

    getFormItems : function() {
        var me = this;

        return [{
            xtype    : "fieldset",
            title    : "Items to monitor",
            defaults : {
                labelSeparator : ""
            },
            items : [{
                xtype      : "checkbox",
                name       : "cpuenable",
                boxLabel   : _("Will monitor CPU Temperature - Working"),
                fieldLabel : _("CPU Temperature"),
                checked    : false
            },{
                xtype   : "button",
                name    : "colours",
                text    : _("Choose Colours"),
                scope   : this,
                menu: [{
                    text: 'Main CPU Colour',
                    menu: {
                        xtype  : 'colormenu',
                        name   : 'colourc',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 1 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour1',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 2 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour2',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 3 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour3',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 4 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour4',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 5 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour5',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 6 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour6',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 7 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour7',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                },{
                    text: 'Core 8 Colour',
                    menu: {
                        xtype: 'colormenu',
                        name   : 'colour8',
                        value  : '000000',
                        //handler: function (obj, rgb) {
                        //    Ext.Msg.alert('background-color: ' + rgb.toString());
                        //} // handler
                    } // menu
                }]
            },{
                xtype      : "checkbox",
                name       : "cpufanenable",
                boxLabel   : _("Will monitor CPU fan speed - Not implemented"),
                fieldLabel : _("CPU Fan Speed"),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "sysfanenable",
                boxLabel   : _("Will monitor system fan speed - Not implemented"),
                fieldLabel : _("SYS Fan Speed"),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "mbtemp",
                boxLabel   : _("Will monitor Motherboard Temperature - Not implemented"),
                fieldLabel : _("MB Temperature"),
                checked    : false
            }]
        }];
    },
});

OMV.WorkspaceManager.registerPanel({
    id        : "settings",
    path      : "/service/sensors",
    text      : _("Settings"),
    position  : 10,
    className : "OMV.module.admin.service.sensors.Settings"
});
