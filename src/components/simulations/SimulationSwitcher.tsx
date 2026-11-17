import React from 'react';
import type { SimulationId } from '../../types/syllabus';
import { CodePlayground } from '../CodePlayground';
import { HttpDnsSimulator } from './HttpDnsSimulator';
import { EmailProtocolSimulator } from './EmailProtocolSimulator';
import { CssBoxModelSimulator } from './CssBoxModelSimulator';
import { XmlParserSimulator } from './XmlParserSimulator';
import { SoaAjaxSimulator } from './SoaAjaxSimulator';
import { SemanticSearchSimulator } from './SemanticSearchSimulator';
import { NextGen5GIoTSimulator } from './NextGen5GIoTSimulator';

interface SimulationSwitcherProps {
  simulationId: SimulationId;
  fallbackCode?: string;
}

export const SimulationSwitcher: React.FC<SimulationSwitcherProps> = ({
  simulationId,
  fallbackCode,
}) => {
  switch (simulationId) {
    case 'http-lifecycle':
      return <HttpDnsSimulator defaultTab="http" />;
    case 'dns-resolver':
      return <HttpDnsSimulator defaultTab="dns" />;
    case 'email-protocols':
      return <EmailProtocolSimulator />;
    case 'css-box-model':
      return <CssBoxModelSimulator />;
    case 'html-sandbox':
      return <CodePlayground initialCode={fallbackCode} title="Topic Interactive HTML/JS Lab" compact />;
    case 'xml-parser':
      return <XmlParserSimulator />;
    case 'soa-soap':
      return <SoaAjaxSimulator defaultTab="soa" />;
    case 'ajax-xhr':
      return <SoaAjaxSimulator defaultTab="ajax" />;
    case 'semantic-search':
      return <SemanticSearchSimulator />;
    case 'nextgen-5g-iot':
      return <NextGen5GIoTSimulator />;
    default:
      return <CodePlayground initialCode={fallbackCode} compact />;
  }
};
