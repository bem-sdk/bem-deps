import { expect } from 'chai';
import { resolve } from '../../lib/index';

describe('resolve: input params processing', function () {
    it('should return result containing entities and dependOn sections', function () {
        var resolved = resolve();

        expect(resolved).to.have.all.keys(['entities', 'dependOn']);
    });

    it('should return empty entities if no args passed', function () {
        var resolved = resolve();

        expect(resolved.entities).to.be.empty;
    });

    it('should return empty dependOn if decl is not specified or empty', function () {
        var resolved = resolve();

        expect(resolved.dependOn).to.be.empty;
    });

    it('should return empty dependOn for any decl if deps is not specified or empty', function () {
        var decl = [{ block: 'A' }],
            resolved = resolve(decl);

        expect(resolved.dependOn).to.be.empty;
    });

    it('should return empty dependOn for any decl and deps if opts are not specified', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [{ entity: { block: 'B' } }]
                }
            ],
            resolved = resolve(decl, deps);

        expect(resolved.dependOn).to.be.empty;
    });

    it('should return identical decl if no deps are specified', function () {
        var decl = [{ block: 'A' }],
            resolved = resolve(decl);

        expect(resolved.entities).to.be.deep.equal(decl);
    });

    it('should allow to specify single-element deps graph as object', function () {
        var decl = [{ block: 'A' }],
            depsItem = {
                entity: { block: 'A' },
                dependOn: [
                    {
                        entity: { block: 'B' }
                    }
                ]
            },
            resolvedDepsArray = resolve(decl, [depsItem]),
            resolvedDepsObject = resolve(decl, depsItem);

        expect(resolvedDepsArray).to.be.deep.equal(resolvedDepsObject);
    });

    it('should return identical decl for specific tech for unspecified deps declaration', function () {
        var decl = [{ block: 'A' }],
            resolved = resolve(decl, undefined, { tech: 'css' });

        expect(resolved.entities).to.be.deep.equal(decl);
    });

    it('should return identical decl for specific tech for empty deps declaration', function () {
        var decl = [{ block: 'A' }],
            resolved = resolve(decl, [], { tech: 'css' });

        expect(resolved.entities).to.be.deep.equal(decl);
    });

    it('should allow to specify tech as a string param instead of opts object', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [{ entity: { block: 'B' } }]
                }
            ],
            opts = { tech: 'css' },
            resolvedOpts = resolve(decl, deps, opts),
            resolvedTechShorthand = resolve(decl, deps, 'css');

        expect(resolvedOpts).to.be.deep.equal(resolvedTechShorthand);
    });

    it('should return identical decl list if decl and tech specified', function () {
        var decl = [{ block: 'A' }],
            opts = { tech: 'css' },
            resolved = resolve(decl, opts);

        expect(resolved.entities).to.be.deep.equal(decl);
    });

    it('should return identical decl list if decl specified and tech passed in shorthand style', function () {
        var decl = [{ block: 'A' }],
            resolved = resolve(decl, 'css');

        expect(resolved.entities).to.be.deep.equal(decl);
    });
});
