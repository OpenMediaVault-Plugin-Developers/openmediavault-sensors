/**
 * Copyright (C) 2013-2015 OpenMediaVault Plugin Developers
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
    requires: [
        "OMV.data.Model",
        "OMV.data.Store"
    ],

    rpcService   : "Sensors",
    rpcGetMethod : "getSettings",
    rpcSetMethod : "setSettings",

    plugins      : [{
        ptype        : "linkedfields",
        correlations : [{
            name       : [
                "jntemp",
            ],
            conditions : [
                { name  : "cpuenable", value : true },
                { name  : "mbtemp", value : true }
            ],
            properties : "show"
        },{
            name       : [
                "jnfans",
            ],
            conditions : [
                { name  : "cpufanenable", value : true },
                { name  : "sysfanenable", value : true }
            ],
            properties : "show"
        }]
    }],

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
                boxLabel   : _("Will monitor CPU Temperature"),
                fieldLabel : _("CPU Temperature"),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "mbtemp",
                boxLabel   : _("Will monitor Motherboard Temperature"),
                fieldLabel : _("MB Temperature"),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "jntemp",
                boxLabel   : _("Create 1 graph for temperatures"),
                fieldLabel : _(" "),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "cpufanenable",
                boxLabel   : _("Will monitor CPU fan speed"),
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
                name       : "jnfans",
                boxLabel   : _("Create 1 graph for fan speeds"),
                fieldLabel : _(" "),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "fheit",
                boxLabel   : _("Will show temps in fahrenheit"),
                fieldLabel : _("Fahrenheit"),
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
