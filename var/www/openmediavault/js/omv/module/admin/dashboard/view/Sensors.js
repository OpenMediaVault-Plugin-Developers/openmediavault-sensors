/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2015 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenMediaVault. If not, see <http://www.gnu.org/licenses/>.
 */
// require("js/omv/workspace/dashboard/View.js")
// require("js/omv/data/Store.js")
// require("js/omv/data/Model.js")
// require("js/omv/data/proxy/Rpc.js")
// require("js/omv/workspace/grid/Panel.js")
// require("js/omv/util/Format.js")

/**
 * @class OMV.module.admin.dashboard.view.Sensors
 * @derived OMV.workspace.dashboard.View
 */
Ext.define("OMV.module.admin.dashboard.view.Sensors", {
	extend: "OMV.workspace.dashboard.View",
	alias: "widget.module.admin.dashboard.view.sensors",
	requires: [
		"OMV.workspace.grid.Panel",
		"OMV.data.Store",
		"OMV.data.Model",
		"OMV.data.proxy.Rpc",
		"OMV.util.Format"
	],

	height: 220,
	refreshInterval: 5000,

	initComponent: function() {
                var me = this;
                me.callParent(arguments);
                // Add Sub Tabs.
                me.add(Ext.create("OMV.workspace.panel.RrdGraph", {
                                                title: "CPU Temp",
                                                rrdGraphName: "sensors"
                                        }));
		me.callParent(arguments);
	},

	doRefresh: function() {
		var me = this;
		me.gp.doReload();
	}
});
