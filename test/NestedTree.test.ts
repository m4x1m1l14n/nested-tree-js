import { NestedTreeNode } from '../src/classes/NestedTreeNode';

describe( 'Nested tree node tests', () =>
{
	test( 'Single node tree', () =>
	{
		const root = new NestedTreeNode();

		expect( root.parent ).toBeNull();
		expect( root.left ).toBe( 0 );
		expect( root.right ).toBe( 1 );
		expect( root.depth ).toBe( 0 );
		expect( root.childrens ).toEqual( [] );

		expect( root.getRoot() ).toBe( root );
		expect( root.isRoot() ).toBeTruthy();
		expect( root.isLeaf() ).toBeFalsy();
	} );

	test( 'Append first child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();

		root.append( child );

		expect( root.parent ).toBeNull();
		expect( root.getRoot() ).toBe( root );
		expect( root.isRoot() ).toBeTruthy();
		expect( root.isLeaf() ).toBeFalsy();

		expect( child.parent ).toBe( root );
		expect( child.getRoot() ).toBe( root );
		expect( child.isRoot() ).toBeFalsy();
		expect( child.isLeaf() ).toBeTruthy();

		expect( root.depth ).toBe( 0 );
		expect( child.depth ).toBe( 1 );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( child.right ).toBe( 2 );
		expect( root.right ).toBe( 3 );
	} );

	test( 'Prepend first child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();

		root.prepend( child );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( child.right ).toBe( 2 );
		expect( root.right ).toBe( 3 );
	} );

	test( 'Append second child', () =>
	{
		const root = new NestedTreeNode();
		const child1 = new NestedTreeNode();
		const child2 = new NestedTreeNode();

		root.append( child1 );
		root.append( child2 );

		expect( root.parent ).toBeNull();
		expect( child1.parent ).toBe( root );
		expect( child2.parent ).toBe( root );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( child1.right ).toBe( 2 );
		expect( child2.left ).toBe( 3 );
		expect( child2.right ).toBe( 4 );
		expect( root.right ).toBe( 5 );
	} );

	test( 'Prepend second child', () =>
	{
		const root = new NestedTreeNode();
		const child1 = new NestedTreeNode();
		const child2 = new NestedTreeNode();

		root.append( child1 );
		root.prepend( child2 );

		expect( root.parent ).toBeNull();
		expect( child1.parent ).toBe( root );
		expect( child2.parent ).toBe( root );

		expect( root.left ).toBe( 0 );

		expect( child2.left ).toBe( 1 );
		expect( child2.right ).toBe( 2 );

		expect( child1.left ).toBe( 3 );
		expect( child1.right ).toBe( 4 );

		expect( root.right ).toBe( 5 );
	} );

	test( 'Append nested child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild = new NestedTreeNode();

		child.append( subchild );
		root.append( child );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild.parent ).toBe( child );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild.left ).toBe( 2 );
		expect( subchild.right ).toBe( 3 );
		expect( child.right ).toBe( 4 );
		expect( root.right ).toBe( 5 );
	} );

	test( 'Append nested child (switched order)', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild = new NestedTreeNode();

		root.append( child );
		child.append( subchild );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild.parent ).toBe( child );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild.left ).toBe( 2 );
		expect( subchild.right ).toBe( 3 );
		expect( child.right ).toBe( 4 );
		expect( root.right ).toBe( 5 );
	} );

	test( 'Append nested child with multiple childrens', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		child.append( subchild1 ).append( subchild2 ).append( subchild3 );
		root.append( child );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild1.parent ).toBe( child );
		expect( subchild2.parent ).toBe( child );
		expect( subchild3.parent ).toBe( child );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild1.left ).toBe( 2 );
		expect( subchild1.right ).toBe( 3 );
		expect( subchild2.left ).toBe( 4 );
		expect( subchild2.right ).toBe( 5 );
		expect( subchild3.left ).toBe( 6 );
		expect( subchild3.right ).toBe( 7 );
		expect( child.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );
	} );

	test( 'Append nested child with multiple childrens (switched order)', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		root.append( child );
		child.append( subchild1 ).append( subchild2 ).append( subchild3 );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild1.parent ).toBe( child );
		expect( subchild2.parent ).toBe( child );
		expect( subchild3.parent ).toBe( child );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild1.left ).toBe( 2 );
		expect( subchild1.right ).toBe( 3 );
		expect( subchild2.left ).toBe( 4 );
		expect( subchild2.right ).toBe( 5 );
		expect( subchild3.left ).toBe( 6 );
		expect( subchild3.right ).toBe( 7 );
		expect( child.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );
	} );

	test( 'Append / prepend node to itself', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();

		child.append( new NestedTreeNode() ).append( new NestedTreeNode() );
		root.append( child );

		expect( () => child.append( child ) ).toThrow();
		expect( () => child.prepend( child ) ).toThrow();
	} );

	test( 'Remove only child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();

		root.append( child );

		root.removeChild( child );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBeNull();

		expect( root.left ).toBe( 0 );
		expect( root.right ).toBe( 1 );

		expect( child.left ).toBe( 0 );
		expect( child.right ).toBe( 1 );
	} );

	test( 'Remove first child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		child.append( subchild1 ).append( subchild2 ).append( subchild3 );
		root.append( child );

		child.removeChild( subchild1 );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild1.parent ).toBeNull();
		expect( subchild2.parent ).toBe( child );
		expect( subchild3.parent ).toBe( child );

		expect( subchild1.left ).toBe( 0 );
		expect( subchild1.right ).toBe( 1 );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild2.left ).toBe( 2 );
		expect( subchild2.right ).toBe( 3 );
		expect( subchild3.left ).toBe( 4 );
		expect( subchild3.right ).toBe( 5 );
		expect( child.right ).toBe( 6 );
		expect( root.right ).toBe( 7 );
	} );

	test( 'Remove last child', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		child.append( subchild1 ).append( subchild2 ).append( subchild3 );
		root.append( child );

		child.removeChild( subchild3 );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBe( root );
		expect( subchild1.parent ).toBe( child );
		expect( subchild2.parent ).toBe( child );
		expect( subchild3.parent ).toBeNull();

		expect( subchild3.left ).toBe( 0 );
		expect( subchild3.right ).toBe( 1 );

		expect( root.left ).toBe( 0 );
		expect( child.left ).toBe( 1 );
		expect( subchild1.left ).toBe( 2 );
		expect( subchild1.right ).toBe( 3 );
		expect( subchild2.left ).toBe( 4 );
		expect( subchild2.right ).toBe( 5 );
		expect( child.right ).toBe( 6 );
		expect( root.right ).toBe( 7 );
	} );

	test( 'Remove child with multiple descendants', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		child.append( subchild1 ).append( subchild2 ).append( subchild3 );
		root.append( child );

		root.removeChild( child );

		expect( root.parent ).toBeNull();
		expect( child.parent ).toBeNull();
		expect( subchild1.parent ).toBe( child );
		expect( subchild2.parent ).toBe( child );
		expect( subchild3.parent ).toBe( child );

		expect( root.left ).toBe( 0 );
		expect( root.right ).toBe( 1 );

		expect( child.left ).toBe( 0 );
		expect( subchild1.left ).toBe( 1 );
		expect( subchild1.right ).toBe( 2 );
		expect( subchild2.left ).toBe( 3 );
		expect( subchild2.right ).toBe( 4 );
		expect( subchild3.left ).toBe( 5 );
		expect( subchild3.right ).toBe( 6 );
		expect( child.right ).toBe( 7 );
	} );

	test( 'Search for non-existing node', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();

		const found = root.search( ( node ) =>
		{
			return node === child;
		} );

		expect( found ).toBeNull();
	} );

	test( 'Search for same node', () =>
	{
		const root = new NestedTreeNode();

		const found = root.search( ( node ) =>
		{
			return node === root;
		} );

		expect( found ).toBe( root );
	} );

	test( 'Search for descendant', () =>
	{
		const root = new NestedTreeNode();
		const child = new NestedTreeNode();
		const subchild1 = new NestedTreeNode();
		const subchild2 = new NestedTreeNode();
		const subchild3 = new NestedTreeNode();

		child.append( subchild1 ).append( subchild2 ).append( subchild3 );
		root.append( child );

		const found = root.search( ( node ) =>
		{
			return node === subchild2;
		} );

		expect( found ).toBe( subchild2 );
	} );

	test( 'Previous / next sibling', () =>
	{
		const root = new NestedTreeNode();
		const child1 = new NestedTreeNode();
		const child2 = new NestedTreeNode();
		const child3 = new NestedTreeNode();

		root
			.append( child1 )
			.append( child2 )
			.append( child3 );

		expect( root.nextSibling() ).toBeNull();
		expect( root.previousSibling() ).toBeNull();

		expect( child1.previousSibling() ).toBeNull();
		expect( child1.nextSibling() ).toBe( child2 );

		expect( child2.previousSibling() ).toBe( child1 );
		expect( child2.nextSibling() ).toBe( child3 );

		expect( child3.previousSibling() ).toBe( child2 );
		expect( child3.nextSibling() ).toBeNull();
	} );

	test( 'Move node (change parent) with append', () =>
	{
		const root = new NestedTreeNode();
		const child1 = new NestedTreeNode();
		const child2 = new NestedTreeNode();
		const subchild = new NestedTreeNode();
		const child3 = new NestedTreeNode();

		root
			.append( child1 )
			.append( child2.append( subchild ) )
			.append( child3 );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( child1.right ).toBe( 2 );
		expect( child2.left ).toBe( 3 );
		expect( subchild.left ).toBe( 4 );
		expect( subchild.right ).toBe( 5 );
		expect( child2.right ).toBe( 6 );
		expect( child3.left ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );

		child1.append( subchild );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( subchild.left ).toBe( 2 );
		expect( subchild.right ).toBe( 3 );
		expect( child1.right ).toBe( 4 );
		expect( child2.left ).toBe( 5 );
		expect( child2.right ).toBe( 6 );
		expect( child3.left ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );

		child3.append( subchild );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( child1.right ).toBe( 2 );
		expect( child2.left ).toBe( 3 );
		expect( child2.right ).toBe( 4 );
		expect( child3.left ).toBe( 5 );
		expect( subchild.left ).toBe( 6 );
		expect( subchild.right ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );
	} );

	test( 'Move node (change parent) with prepend', () =>
	{
		const root = new NestedTreeNode();
		const child1 = new NestedTreeNode();
		const child2 = new NestedTreeNode();
		const subchild = new NestedTreeNode();
		const child3 = new NestedTreeNode();

		root
			.append( child1 )
			.append( child2.append( subchild ) )
			.append( child3 );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( child1.right ).toBe( 2 );
		expect( child2.left ).toBe( 3 );
		expect( subchild.left ).toBe( 4 );
		expect( subchild.right ).toBe( 5 );
		expect( child2.right ).toBe( 6 );
		expect( child3.left ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );

		child1.prepend( subchild );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( subchild.left ).toBe( 2 );
		expect( subchild.right ).toBe( 3 );
		expect( child1.right ).toBe( 4 );
		expect( child2.left ).toBe( 5 );
		expect( child2.right ).toBe( 6 );
		expect( child3.left ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );

		child3.prepend( subchild );

		expect( root.left ).toBe( 0 );
		expect( child1.left ).toBe( 1 );
		expect( child1.right ).toBe( 2 );
		expect( child2.left ).toBe( 3 );
		expect( child2.right ).toBe( 4 );
		expect( child3.left ).toBe( 5 );
		expect( subchild.left ).toBe( 6 );
		expect( subchild.right ).toBe( 7 );
		expect( child3.right ).toBe( 8 );
		expect( root.right ).toBe( 9 );
	} );
} );
