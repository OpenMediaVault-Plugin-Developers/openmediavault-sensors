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

Ext.define('OMV.module.admin.service.sensors.Settings', {
    extend : 'OMV.workspace.form.Panel',
    requires: [
        'OMV.data.Model',
        'OMV.data.Store'
    ],

    rpcService   : 'Sensors',
    rpcGetMethod : 'getSettings',
    rpcSetMethod : 'setSettings',

    plugins      : [{
        ptype        : 'linkedfields',
        correlations : [{
            name       : [
                'jntemp',
            ],
            conditions : [
                { name  : 'cpuenable', value : true },
                { name  : 'mbtemp', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'jnfans',
            ],
            conditions : [
                { name  : 'cpufanenable', value : true },
                { name  : 'sysfanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'shcore',
            ],
            conditions : [
                { name  : 'cpuenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'tabmain',
            ],
            conditions : [
                { name  : 'cpufanenable', value : false },
                { name  : 'sysfanenable', value : false },
                { name  : 'cpuenable', value : false },
                { name  : 'mbtemp', value : false }
            ],
            properties : '!show'
        },{
            name       : [
                'tabcputemp',
            ],
            conditions : [
                { name  : 'cpuenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'tabcpufan',
            ],
            conditions : [
                { name  : 'cpufanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'tabmbtemp',
            ],
            conditions : [
                { name  : 'mbtemp', value : true },
                { name  : 'jntemp', value : false }
            ],
            properties : 'show'
        },{
            name       : [
                'tabsysfan',
            ],
            conditions : [
                { name  : 'sysfanenable', value : true },
                { name  : 'jnfans', value : false }
            ],
            properties : 'show'
        },{
            name       : [
                'sysoffset',
            ],
            conditions : [
                { name  : 'sysfanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'graphcputitle',
            ],
            conditions : [
                { name  : 'cpuenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'graphmbtitle',
            ],
            conditions : [
                { name  : 'mbtemp', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'graphcfantitle',
            ],
            conditions : [
                { name  : 'cpufanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'graphsfantitle',
            ],
            conditions : [
                { name  : 'sysfanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'linecputemp',
            ],
            conditions : [
                { name  : 'cpuenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'linecpufan',
            ],
            conditions : [
                { name  : 'cpufanenable', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'linembtemp',
            ],
            conditions : [
                { name  : 'mbtemp', value : true }
            ],
            properties : 'show'
        },{
            name       : [
                'linesysfan',
            ],
            conditions : [
                { name  : 'sysfanenable', value : true }
            ],
            properties : 'show'
        }]
    }],

    getFormItems : function() {
        return [{
            xtype    : 'fieldset',
            title    : 'Items to monitor - Remember to refresh after saving',
            defaults : {
                labelSeparator : ''
            },
            items : [{
                xtype      : 'checkbox',
                name       : 'cpuenable',
                boxLabel   : _('Will monitor CPU Temperature'),
                fieldLabel : _('CPU Temperature'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'shcore',
                boxLabel   : _('Will also monitor CPU cores Temperatures'),
                fieldLabel : _('Show Cores'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'mbtemp',
                boxLabel   : _('Will monitor Motherboard Temperature'),
                fieldLabel : _('MB Temperature'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'jntemp',
                boxLabel   : _('Create 1 graph for temperatures'),
                fieldLabel : _(' '),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'cpufanenable',
                boxLabel   : _('Will monitor CPU fan speed'),
                fieldLabel : _('CPU Fan Speed'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'sysfanenable',
                boxLabel   : _('Will monitor system fan speed'),
                fieldLabel : _('SYS Fan Speed'),
                checked    : false
            },{
                xtype      : 'textfield',
                name       : 'sysoffset',
                boxLabel   : _('Add value to get correct system fan (-/+)'),
                fieldLabel : _('SYS Fan Offset'),
                allowBlank : true
            },{
                xtype      : 'checkbox',
                name       : 'jnfans',
                boxLabel   : _('Create 1 graph for fan speeds'),
                fieldLabel : _(' '),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'fheit',
                boxLabel   : _('Will show temps in fahrenheit'),
                fieldLabel : _('Fahrenheit'),
                checked    : false
            }]
                },{
            xtype    : 'fieldset',
            title    : 'Custom user settings',
            defaults : {
                labelSeparator : ''
            },
            items : [{
                xtype: 'textfield',
                name: 'tabmain',
                fieldLabel: _('Main Tab Title'),
                allowBlank: false,
                value: 'OMV Sensors',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('The main tab title, other tabs (below) are sub tabs.')
                }]
             }, {
                xtype: 'textfield',
                name: 'tabcputemp',
                fieldLabel: _('CPU Temp Tab Title'),
                allowBlank: false,
                value: 'CPU Temp',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used for the CPU temperature tab. Will also be title of combined temps.')
                }]
             }, {
                xtype: 'textfield',
                name: 'tabmbtemp',
                fieldLabel: _('MB Temp Tab Title'),
                allowBlank: false,
                value: 'MotherBoard Temp',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used for the motherBoard temperature tab.')
                }]
             }, {
                xtype: 'textfield',
                name: 'tabcpufan',
                fieldLabel: _('CPU Fan Tab Title'),
                allowBlank: false,
                value: 'CPU fan speed',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used for the CPU fan speed tab. Will also be title of combined fans.')
                }]
             }, {
                xtype: 'textfield',
                name: 'tabsysfan',
                fieldLabel: _('SYS fan speed'),
                allowBlank: false,
                value: 'SYS fan speed',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used for the system fan speed tab.')
                }]
             }, {
                xtype: 'textfield',
                name: 'graphcputitle',
                fieldLabel: _('CPU Temp Graph Title'),
                allowBlank: false,
                value: 'CPU temperature',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used on the CPU temperature graph. Will also be title of combined temps.')
                }]
             }, {
                xtype: 'textfield',
                name: 'graphmbtitle',
                fieldLabel: _('Motherboard Temp Graph Title'),
                allowBlank: false,
                value: 'MB temperature',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used on the Motherboard temperature graph.')
                }]
             }, {
                xtype: 'textfield',
                name: 'graphcfantitle',
                fieldLabel: _('CPU Fan Graph Title'),
                allowBlank: false,
                value: 'CPU fan speed',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used on the CPU fan graph. Will also be title of combined fans.')
                }]
             }, {
                xtype: 'textfield',
                name: 'graphsfantitle',
                fieldLabel: _('SYS Fan Graph Title'),
                allowBlank: false,
                value: 'System fan speed',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Title used on the System fan graph.')
                }]
             }, {
                xtype: 'textfield',
                name: 'linecputemp',
                fieldLabel: _('Graph Temp CPU Label'),
                allowBlank: false,
                value: 'CPU',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('CPU Label used on the graph.')
                }]
             }, {
                xtype: 'textfield',
                name: 'linecpufan',
                fieldLabel: _('Graph CPU Fan Label'),
                allowBlank: false,
                value: 'CPU Fan',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('CPU Fan Label used on the graph.')
                }]
             }, {
                xtype: 'textfield',
                name: 'linembtemp',
                fieldLabel: _('Graph Motherboard Temp Label'),
                allowBlank: false,
                value: 'MB',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Motherboard temperature label used on the graph.')
                }]
             }, {
                xtype: 'textfield',
                name: 'linesysfan',
                fieldLabel: _('Graph System Fan Label'),
                allowBlank: false,
                value: 'SYS Fan',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('System Fan label used on the graph.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : 'settings',
    path      : '/service/sensors',
    text      : _('Settings'),
    position  : 10,
    className : 'OMV.module.admin.service.sensors.Settings'
});

