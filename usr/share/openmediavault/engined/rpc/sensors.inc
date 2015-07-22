<?php

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

require_once "openmediavault/config.inc";
require_once "openmediavault/error.inc";
require_once "openmediavault/notify.inc";
require_once "openmediavault/object.inc";
require_once "openmediavault/product.inc";
require_once "openmediavault/rpcservice.inc";
require_once "openmediavault/system.inc";
require_once "openmediavault/util.inc";

class OMVRpcServiceSensors extends OMVRpcServiceAbstract
{
    private function getPluginName()
    {
        return strtolower($this->getName());
    }

    private function getEventMessagePath()
    {
        return sprintf("org.openmediavault.service.%s", $this->getPluginName());
    }

    private function getXPath()
    {
        return sprintf("//services/%s", $this->getPluginName());
    }

    public function getName()
    {
        return "Sensors";
    }

    public function initialize()
    {
        $this->registerMethod("getSettings");
        $this->registerMethod("setSettings");
    }

    public function getSettings($params, $context)
    {
        global $xmlConfig;

        $this->validateMethodContext($context, array(
            "role" => OMV_ROLE_ADMINISTRATOR
        ));

        $object = $xmlConfig->get($this->getXPath());

        if (is_null($object)) {
            throw new OMVException(
                OMVErrorMsg::E_CONFIG_GET_OBJECT_FAILED,
                $this->getXPath()
            );
        }

        $object["cpuenable"]      = boolval($object["cpuenable"]);
        $object["sysfanenable"]   = boolval($object["sysfanenable"]);
        $object["cpufanenable"]   = boolval($object["cpufanenable"]);
        $object["mbtemp"]         = boolval($object["mbtemp"]);
        $object["fheit"]          = boolval($object["fheit"]);
        $object["jntemp"]         = boolval($object["jntemp"]);
        $object["jnfans"]         = boolval($object["jnfans"]);
        $object["shcore"]         = boolval($object["shcore"]);
        $object["sysoffset"]      = $object["sysoffset"];
        $object["tabmain"]        = $object["tabmain"];
        $object["tabcputemp"]     = $object["tabcputemp"];
        $object["tabmbtemp"]      = $object["tabmbtemp"];
        $object["tabcpufan"]      = $object["tabcpufan"];
        $object["tabsysfan"]      = $object["tabsysfan"];
        $object["graphcputitle"]  = $object["graphcputitle"];
        $object["graphmbtitle"]   = $object["graphmbtitle"];
        $object["graphcfantitle"] = $object["graphcfantitle"];
        $object["graphsfantitle"] = $object["graphsfantitle"];
        $object["linecputemp"]    = $object["linecputemp"];
        $object["linecpufan"]     = $object["linecpufan"];
        $object["linembtemp"]     = $object["linembtemp"];
        $object["linesysfan"]     = $object["linesysfan"];

        return $object;
    }

    public function setSettings($params, $context)
    {
        global $xmlConfig;

        $this->validateMethodContext($context, array(
            "role" => OMV_ROLE_ADMINISTRATOR
        ));

        $this->validateMethodParams(
            $params,
            '{
                "type"       : "object",
                "properties" : {
                    "cpuenable"       : { "type" : "boolean" },
                    "sysfanenable"    : { "type" : "boolean" },
                    "cpufanenable"    : { "type" : "boolean" },
                    "mbtemp"          : { "type" : "boolean" },
                    "fheit"           : { "type" : "boolean" },
                    "jntemp"          : { "type" : "boolean" },
                    "jnfans"          : { "type" : "boolean" },
                    "shcore"          : { "type" : "boolean" },
                    "sysoffset"       : { "type" : "string" },
                    "tabmain"         : { "type" : "string" },
                    "tabcputemp"      : { "type" : "string" },
                    "tabmbtemp"       : { "type" : "string" },
                    "tabcpufan"       : { "type" : "string" },
                    "tabsysfan"       : { "type" : "string" },
                    "graphcputitle"   : { "type" : "string" },
                    "graphmbtitle"    : { "type" : "string" },
                    "graphcfantitle"  : { "type" : "string" },
                    "graphsfantitle"  : { "type" : "string" },
                    "linecputemp"     : { "type" : "string" },
                    "linecpufan"      : { "type" : "string" },
                    "linembtemp"      : { "type" : "string" },
                    "linesysfan"      : { "type" : "string" }
                }
            }'
        );

        $object = array(
            "cpuenable"       => array_boolval($params, "cpuenable"),
            "sysfanenable"    => array_boolval($params, "sysfanenable"),
            "cpufanenable"    => array_boolval($params, "cpufanenable"),
            "mbtemp"          => array_boolval($params, "mbtemp"),
            "fheit"           => array_boolval($params, "fheit"),
            "jntemp"          => array_boolval($params, "jntemp"),
            "jnfans"          => array_boolval($params, "jnfans"),
            "shcore"          => array_boolval($params, "shcore"),
            "sysoffset"       => $params["sysoffset"],
            "tabmain"         => $params["tabmain"],
            "tabcputemp"      => $params["tabcputemp"],
            "tabmbtemp"       => $params["tabmbtemp"],
            "tabcpufan"       => $params["tabcpufan"],
            "tabsysfan"       => $params["tabsysfan"],
            "graphcputitle"   => $params["graphcputitle"],
            "graphmbtitle"    => $params["graphmbtitle"],
            "graphcfantitle"  => $params["graphcfantitle"],
            "graphsfantitle"  => $params["graphsfantitle"],
            "linecputemp"     => $params["linecputemp"],
            "linecpufan"      => $params["linecpufan"],
            "linembtemp"      => $params["linembtemp"],
            "linesysfan"      => $params["linesysfan"]
        );

        if ($xmlConfig->replace($this->getXpath(), $object) === false) {
            throw new OMVException(
                OMVErrorMsg::E_CONFIG_SET_OBJECT_FAILED,
                $this->getXpath()
            );
        }

        $dispatcher = &OMVNotifyDispatcher::getInstance();
        $dispatcher->notify(
            OMV_NOTIFY_MODIFY,
            $this->getEventMessagePath(),
            $object
        );

        return $object;
    }
}

// Register the RPC service.
$rpcServiceMgr = &OMVRpcServiceMgr::getInstance();
$rpcServiceMgr->registerService(new OMVRpcServiceSensors());
