import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../components/Input';
import { Tabs } from '../components/Tabs';
import { Alert } from '../components/Alert';
import { NAV_SECTIONS, DATA } from '../data/ootbData';
import { ISSUES } from '../utils/ootbLogic';
import TypeChips from './ootb/TypeChips';
import ExecutionFlowRow from './ootb/ExecutionFlowRow';
import ExecutionFlowGraph from './ootb/ExecutionFlowGraph';
import TableExplorer from './ootb/TableExplorer';
import ReservedPage from './ootb/ReservedPage';
import TaskPanel from './ootb/TaskPanel';
import './ootb/ootb.styles.scss';

function sameGroupWarningText() {
  const byKey = {};
  ISSUES.forEach((i) => {
    const key = `${i.group}|${i.dep}`;
    (byKey[key] = byKey[key] || []).push(i.task);
  });
  const sentences = Object.keys(byKey).map((key) => {
    const [g, dep] = key.split('|');
    const names = byKey[key];
    const plural = names.length > 1;
    return `In ${g}, ${names.join(', ')} ${plural ? 'are' : 'is'} listed alongside ${dep} but ${
      plural ? 'depend' : 'depends'
    } on it — confirm ${plural ? 'they run' : 'it runs'} right after ${dep}, not in parallel with it.`;
  });
  return sentences.join(' ');
}

export default function OotbPage() {
  const { sectionId } = useParams();
  const section = NAV_SECTIONS.find((s) => s.id === sectionId) || NAV_SECTIONS[0];
  const [activeTypes, setActiveTypes] = useState({});
  const [query, setQuery] = useState('');
  const [view, setView] = useState('row');
  const [openTask, setOpenTask] = useState(null);

  function toggleType(key) {
    setActiveTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const mastersCount = DATA.filter((t) => t.m.length).length;

  return (
    <div className="ootb-page">
      <h1 className="ootb-page__title">{section.page_title}</h1>
      {section.page_description && <p className="ootb-page__desc">{section.page_description}</p>}

      {section.status === 'soon' ? (
        <ReservedPage section={section} />
      ) : section.id === 'nav-flow' ? (
        <>
          <Alert
            severity="info"
            title="Start with Sourcing"
            description={`${mastersCount} of ${DATA.length} tasks trace back to Master data the client's Sourcing team provides directly. Confirm those land cleanly before Group P1 starts.`}
          />
          {ISSUES.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <Alert severity="warning" title="Check before you parallelize" description={sameGroupWarningText()} />
            </div>
          )}

          <div className="ootb-page__toolbar">
            <Tabs
              tabNames={[
                { value: 'row', label: 'Row view' },
                { value: 'graph', label: 'Graph view' },
              ]}
              tabPanels={[<></>, <></>]}
              value={view}
              onChange={(e, val) => setView(val)}
            />
            <div className="ootb-page__search">
              <Input placeholder="Search tasks or purpose…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          {view === 'row' && <TypeChips activeSet={activeTypes} onToggle={toggleType} />}

          {view === 'row' ? (
            <ExecutionFlowRow activeTypes={activeTypes} query={query} onOpenTask={setOpenTask} />
          ) : (
            <ExecutionFlowGraph onOpenTask={setOpenTask} />
          )}
        </>
      ) : (
        <>
          <div className="ootb-page__toolbar">
            <div className="ootb-page__search">
              <Input placeholder="Search tasks or purpose…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <TypeChips activeSet={activeTypes} onToggle={toggleType} />
          <TableExplorer activeTypes={activeTypes} query={query} onOpenTask={setOpenTask} />
        </>
      )}

      <TaskPanel taskName={openTask} onOpen={setOpenTask} onClose={() => setOpenTask(null)} />
    </div>
  );
}
