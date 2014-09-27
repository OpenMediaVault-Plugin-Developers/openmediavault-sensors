<?php

/**
 * Copyright (C) 2013-2014 OpenMediaVault Plugin Developers
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

        $object["cpuenable"]     = boolval($object["cpuenable"]);
        $object["sysfanenable"]  = boolval($object["sysfanenable"]);
        $object["cpufanenable"]  = boolval($object["cpufanenable"]);
        $object["mbtemp"]        = boolval($object["mbtemp"]);
        $object["colours"]       = $object["colours"];
        $object["colourc"]       = $object["colourc"];
        $object["colour1"]       = $object["colour1"];
        $object["colour2"]       = $object["colour2"];
        $object["colour3"]       = $object["colour3"];
        $object["colour4"]       = $object["colour4"];
        $object["colour5"]       = $object["colour5"];
        $object["colour6"]       = $object["colour6"];
        $object["colour7"]       = $object["colour7"];
        $object["colour8"]       = $object["colour8"];

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
                    "colours"         : { "type" : "string", "optional" : true },
                    "colourc"         : { "type" : "string", "optional" : true },
                    "colour1"         : { "type" : "string", "optional" : true },
                    "colour2"         : { "type" : "string", "optional" : true },
                    "colour3"         : { "type" : "string", "optional" : true },
                    "colour4"         : { "type" : "string", "optional" : true },
                    "colour5"         : { "type" : "string", "optional" : true },
                    "colour6"         : { "type" : "string", "optional" : true },
                    "colour7"         : { "type" : "string", "optional" : true },
                    "colour8"         : { "type" : "string", "optional" : true }

                }
            }'
        );

        $object = array(
            "cpuenable"       => array_boolval($params, "cpuenable"),
            "sysfanenable"    => array_boolval($params, "sysfanenable"),
            "cpufanenable"    => array_boolval($params, "cpufanenable"),
            "mbtemp"          => array_boolval($params, "mbtemp"),
            "colours"         => $params["colours"],
            "colourc"         => $params["colourc"],
            "colour1"         => $params["colour1"],
            "colour2"         => $params["colour2"],
            "colour3"         => $params["colour3"],
            "colour4"         => $params["colour4"],
            "colour5"         => $params["colour5"],
            "colour6"         => $params["colour6"],
            "colour7"         => $params["colour7"],
            "colour8"         => $params["colour8"]
        );

        if (false === $xmlConfig->replace($this->getXPath(), $object)) {
            throw new OMVException(
                OMVErrorMsg::E_CONFIG_SET_OBJECT_FAILED,
                $this->getXPath()
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
