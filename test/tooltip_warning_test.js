import * as assert from 'assert';
import * as QP from '../src/index';
import * as helper from './helper';

let plan_issue39 = require('raw!../test_plans/issue_39.sqlplan');

describe('Tooltip Warnings Section', () => {

    it('Is missing for nodes without s:Warnings', () => {

        let container = helper.showPlan(plan_issue39);
        let tableScan = helper.findNodeById(container, '2');
        assert.equal(null, helper.getToolTipSection(tableScan, 'Warnings'));

    });

    // TODO: Test when @NoJoinPredicate=true, and @NoJoinPredicate is missing
    it('Shows No Join Predicate when s:Warnings/@NoJoinPredicate=1', () => {
        
        let container = helper.showPlan(plan_issue39);
        let nestedLoops = helper.findNodeById(container, '1');
        assert.equal('No Join Predicate',
            helper.getToolTipSection(nestedLoops, 'Warnings'));
        
    });

});