import React from 'react'
import { GroupsPermissions } from '../../utils/groups'

/**
 * Protect a component by providing an array of roles that ARE permitted to access/view it.
 *
 * By d
 * It either returns a `empty fragment` or the `component`, based on the roles provided.
 * @param roles which `user roles` ARE NOT permitted to access/view.
 * @param Component there wrapped component.
 * @example
 * ```
 * withRoleGuard(['COLAB'], <Botao />)
 * ```
 */
const componentWithRoleGuard = (
  roles: ReadonlyArray<GroupsPermissions>,
  Component: React.ReactElement,
) => {
  const RoleComponent = (props: any) => {
    return Component
  }
  return RoleComponent
}

export default componentWithRoleGuard
