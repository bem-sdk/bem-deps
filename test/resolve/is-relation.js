'use strict';

const expect = require('chai').expect;
const isRelation = require('../../lib/resolve/is-relation');

describe('resolve::isRelation()', function () {
    var relation = {
        entity: { block: 'A' },
        dependOn: {
            entity: { block: 'B' }
        }
    };

    it('should detect relation', function () {
        expect(isRelation(relation)).to.be.true;
    });

    it('should not detect relation on array', function () {
        expect(isRelation([relation])).to.be.false;
    });
});
