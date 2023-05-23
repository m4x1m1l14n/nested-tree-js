type Nullable<T> = T | null;

export class NestedTreeNode
{
	/*eslint-disable no-use-before-define */
	private _parent: Nullable<NestedTreeNode> = null;
	private _childrens: NestedTreeNode[] = [];
	/*eslint-enable no-use-before-define */
	private _depth = 0;
	private _left = 0;
	private _right = 1;

	public append( node: NestedTreeNode ): NestedTreeNode
	{
		if ( node === this )
		{
			throw new Error( 'Cannot append node to itself' );
		}

		const removedParent = this.removeParentIfExists( node );

		node._parent = this;
		node.depth = this._depth + 1;

		let newLeft = 0;

		// If added node has some siblings, count its offset based on left siblings right attribute
		if ( this._childrens.length > 0 )
		{
			const lastChildren = this._childrens[this._childrens.length - 1];

			newLeft = lastChildren._right + 1;
		}
		// otherwise count based on parent length
		else
		{
			newLeft = this._left + 1;
		}

		this._childrens.push( node );

		if ( removedParent && removedParent._left < newLeft )
		{
			// Invoke tree rebuild from where it gets changed
			removedParent.left = removedParent._left;
		}
		else
		{
			node.left = newLeft;
		}

		return this;
	}

	public prepend( node: NestedTreeNode ): NestedTreeNode
	{
		if ( node === this )
		{
			throw new Error( 'Cannot prepend node to itself' );
		}

		const removedParent = this.removeParentIfExists( node );

		node._parent = this;
		node.depth = this._depth + 1;

		let newLeft = 0;

		// If added node has some siblings, count its offset based on left siblings right attribute
		if ( this._childrens.length > 0 )
		{
			const firstChildren = this._childrens[0];

			newLeft = firstChildren._left;
		}
		// otherwise count based on parent length
		else
		{
			newLeft = this._left + 1;
		}

		this._childrens.unshift( node );

		if ( removedParent && removedParent._left < newLeft )
		{
			// Invoke tree rebuild from where it gets changed
			removedParent.left = removedParent._left;
		}
		else
		{
			node.left = newLeft;
		}

		return this;
	}

	public clone(): this
	{
		return this.cloneHelper();
	}

	protected cloneHelper<T extends this>( this: T ): T
	{
		const clone = new ( this.constructor as { new(): T } )();

		const exclude = [ '_childrens', '_parent', '_depth', '_left', '_right' ];

		for ( const prop in this )
		{
			if ( exclude.includes( prop ) )
			{
				continue;
			}

			clone[prop] = this[prop];
		}

		for ( const children of this._childrens )
		{
			clone.append( children.clone() );
		}

		return clone;
	}

	/**
	 * Removes node from its parent
	 * 
	 * NOTE
	 * 	Do not rebuild its childrens. Node is in invalid state
	 * 
	 * @param node Node to be removed from its parent
	 * @returns 
	 */
	private removeParentIfExists( node: NestedTreeNode ): Nullable<NestedTreeNode>
	{
		const { _parent: parent } = node;

		if ( parent === null )
		{
			return parent;
		}

		const { _childrens: childrens } = parent;

		const index = childrens.indexOf( node );

		childrens.splice( index, 1 );

		node._parent = null;

		return parent;
	}

	private getSibling( which: 'previous' | 'next' ): Nullable<NestedTreeNode>
	{
		if ( this._parent === null )
		{
			return null;
		}

		const index = this._parent._childrens.indexOf( this );
		const offset = which === 'previous'
			? -1
			: 1;
		const sibling = this._parent._childrens[index + offset] ?? null;

		return sibling;
	}

	/**
	 * Returns this node previous sibling if exists
	 * 
	 * @returns Previous sibling if exists, null otherwise
	 */
	public previousSibling(): Nullable<NestedTreeNode>
	{
		return this.getSibling( 'previous' );
	}

	/**
	 * Returns this node next sibling if exists
	 * 
	 * @returns Next sibling if exists, null otherwise
	 */
	public nextSibling(): Nullable<NestedTreeNode>
	{
		return this.getSibling( 'next' );
	}

	/**
	 * Checks whether the node is the root node
	 * 
	 * @returns true once node is root node, false otherwise
	 */
	public isRoot(): boolean
	{
		return this.parent === null;
	}

	/**
	 * Checks wether node is last node in branch
	 * 
	 * @returns true in case node is last node in branch, false otherwise
	 */
	public isLeaf(): boolean
	{
		return ( this._depth > 0 && this._childrens.length === 0 );
	}

	public removeChild( child: NestedTreeNode ): NestedTreeNode
	{
		const index = this._childrens.indexOf( child );
		if ( index > -1 )
		{
			child._parent = null;

			if ( index === this._childrens.length - 1 )
			{
				this._childrens.slice( index, 1 );

				this.right = child._left;
			}
			else
			{
				const nextSibling = this._childrens[index + 1];

				this._childrens.slice( index, 1 );

				nextSibling.left = child._left;
			}

			child.left = 0;
		}

		return this;
	}

	/**
	 * Traverse nested tree upwards and returns its root node
	 * 
	 * @returns Root node
	 */
	public getRoot(): NestedTreeNode
	{
		if ( this.isRoot() )
		{
			return this;
		}

		// NOTE
		//	Here parent cannot be null, because in that case node is root node and
		//	code would terminate in condition above, so we can safely use non-null assertion
		//	here
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.parent!.getRoot();
	}

	public search( predicate: ( node: NestedTreeNode ) => boolean ): Nullable<NestedTreeNode>
	{
		if ( predicate( this ) )
		{
			return this;
		}

		for ( const children of this._childrens )
		{
			const node = children.search( predicate );
			if ( node !== null )
			{
				return node;
			}
		}

		return null;
	}

	public get parent(): Nullable<NestedTreeNode>
	{
		return this._parent;
	}

	public get childrens(): NestedTreeNode[]
	{
		return this._childrens;
	}

	public get depth(): number
	{
		return this._depth;
	}

	private set depth( value: number )
	{
		this._depth = value;

		for ( const children of this._childrens )
		{
			children.depth = value + 1;
		}
	}

	public get left(): number
	{
		return this._left;
	}

	private set left( value: number )
	{
		// Update node's left attribute with provided value
		this._left = value;
		// In case node has some childrens, we will continue to update its child nodes
		if ( this._childrens.length > 0 )
		{
			// Just pick up first child, the rest is done via its recursive left setter
			const firstChildren = this._childrens[0];

			firstChildren.left = value + 1;
		}
		// Otherwise, we can update node's right attribute
		else
		{
			this.right = value + 1;
		}
	}

	public get right(): number
	{
		return this._right;
	}

	private set right( value: number )
	{
		this._right = value;
		if ( this._parent )
		{
			const childrens = this._parent._childrens;

			if ( childrens.length > 0 )
			{
				const index = childrens.indexOf( this );
				if ( index === childrens.length - 1 )
				{
					this._parent.right = value + 1;
				}
				else
				{
					const nextSibling = childrens[index + 1];

					nextSibling.left = value + 1;
				}
			}
		}
	}
}
